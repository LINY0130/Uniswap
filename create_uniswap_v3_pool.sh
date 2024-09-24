#!/bin/bash

# Set environment variables
export ETH_RPC_URL="https://testnet.storyrpc.io"
export PRIVATE_KEY="cf4e742ec0b486ebd2f6927a89f7598605bc3063e3c769cfb6f6e3fddcdc956f"

# Uniswap V3 contract addresses
FACTORY_ADDRESS="0x2D1bc93A4d0C23047577ac16C7Fe5CfEAb62B87B"
POSITION_MANAGER="0x5800Ab639a41E48f28d61c74d9Dc65B7ba0c9e2B"
#NonfungiblePositionManager

# Token addresses and parameters
TOKEN_A="0x153B112138C6dE2CAD16D66B4B6448B7b88CAEF3"
TOKEN_B="0xE42849EE7bd8F02B29deD238f6E023aBFA67d438"
#SUSDC：https://testnet.storyscan.xyz/address/0x700722D24f9256Be288f56449E8AB1D27C4a70ca
#WBTC：https://testnet.storyscan.xyz/token/0x153B112138C6dE2CAD16D66B4B6448B7b88CAEF3
#WETH: https://testnet.storyscan.xyz/token/0xE14eABC8Afb28068455e488e605c533435E4EE6b
#FATE: https://testnet.storyscan.xyz/token/0xE42849EE7bd8F02B29deD238f6E023aBFA67d438


DECIMALS_A=$(cast call $TOKEN_A "decimals()(uint8)" --rpc-url $ETH_RPC_URL)
DECIMALS_B=$(cast call $TOKEN_B "decimals()(uint8)" --rpc-url $ETH_RPC_URL)
echo "Token A decimals: $DECIMALS_A"
echo "Token B decimals: $DECIMALS_B"


FEE="3000"
if [ "$FEE" = "100" ]; then
    TICK_SPACING=1
elif [ "$FEE" = "500" ]; then
    TICK_SPACING=10
elif [ "$FEE" = "3000" ]; then
    TICK_SPACING=60
elif [ "$FEE" = "10000" ]; then
    TICK_SPACING=200
else
    echo "Invalid FEE value. Cannot determine TICK_SPACING."
    exit 1
fi
echo "TICK_SPACING: $TICK_SPACING"

TICK_LOWER="-887220"
TICK_UPPER="887220"

SQRT_PRICE_X96="79228162514264337593543950336"


# SQRT_PRICE_X96 explanation:
# This value represents the initial price of the pool in Uniswap V3's sqrtPriceX96 format.
# 79228162514264337593543950336 is equal to 2^96, representing a 1:1 price ratio.
# 
# Meaning: In Uniswap V3, prices are represented as sqrtPriceX96, which is the square root of the price multiplied by 2^96.
# 
# Calculation method: For a 1:1 price ratio, it's simply 2^96.
# For other price ratios, use the formula: sqrtPriceX96 = sqrt(price) * 2^96
# where 'price' is the ratio of token1 / token0.
# 
# Why this format:
# 1. It improves computational efficiency and precision in Uniswap V3.
# 2. Using square root simplifies certain mathematical operations.
# 3. Multiplying by 2^96 allows representation of decimals in fixed-point arithmetic.
#
# Example: To represent a price of 2 (i.e., token1 is twice as valuable as token0),
# you would use: sqrt(2) * 2^96 = 112045541949572289818465351084


# 1. Check if the pool exists
POOL_ADDRESS=$(cast call $FACTORY_ADDRESS "getPool(address,address,uint24)(address)" $TOKEN_A $TOKEN_B $FEE)

if [ "$POOL_ADDRESS" == "0x0000000000000000000000000000000000000000" ]; then
    echo "Pool does not exist. Creating new pool..."
    
    # 2. Create pool
    cast send $FACTORY_ADDRESS "createPool(address,address,uint24)(address)" $TOKEN_A $TOKEN_B $FEE --private-key $PRIVATE_KEY
    
    # Get pool address
    POOL_ADDRESS=$(cast call $FACTORY_ADDRESS "getPool(address,address,uint24)(address)" $TOKEN_A $TOKEN_B $FEE)
    echo "New pool created at address: $POOL_ADDRESS"
    
    # 3. initialize pool
    cast send $POOL_ADDRESS "initialize(uint160)" $SQRT_PRICE_X96 --private-key $PRIVATE_KEY
    echo "Pool initialized"
    #transactionHash         0x715fa8bee31ca9a80d1c17e0a36ad64494950b4ac67402874667a06b14fc09b2
    #status                  1 (success)
else
    echo "Pool already exists at address: $POOL_ADDRESS"
    #Pool already exists at address: 0x2fCFB561961B7b26B78ACc0E1F67Af49761495a3
fi

# Adjust TICK_LOWER and TICK_UPPER
POOL_STATE=$(cast call $POOL_ADDRESS "slot0()(uint160,int24,uint16,uint16,uint16,uint8,bool)" --rpc-url $ETH_RPC_URL)
CURRENT_SQRT_PRICE=$(echo $POOL_STATE | awk '{print $1}')
CURRENT_TICK=$(echo $POOL_STATE | awk '{printf "%d", $2}')
echo "Current sqrtPrice: $CURRENT_SQRT_PRICE"
echo "Current tick: $CURRENT_TICK"

TICK_LOWER=$((CURRENT_TICK - (10 * TICK_SPACING)))
TICK_UPPER=$((CURRENT_TICK + (10 * TICK_SPACING)))


echo "Adjusted TICK_LOWER: $TICK_LOWER"
echo "Adjusted TICK_UPPER: $TICK_UPPER"


# 4. Approve tokens
#The arg 115792089237316195423570985008687907853269984665640564039457584007913129639935 = 2^256 - 1
cast send $TOKEN_A "approve(address,uint256)" $POSITION_MANAGER 115792089237316195423570985008687907853269984665640564039457584007913129639935 --private-key $PRIVATE_KEY
# transactionHash: 0x250deeda407d7306aebae7aeccc2ec2a313cfb38483a6254a8db34f1011c0723
cast send $TOKEN_B "approve(address,uint256)" $POSITION_MANAGER 115792089237316195423570985008687907853269984665640564039457584007913129639935 --private-key $PRIVATE_KEY
# transactionHash: 0x19c4b07847e178da68c6a8111c5af08f7b9275764a058fa6847a0d0bbca7b721
echo "Token approvals granted"


# 5. Add liquidity


if [[ "$TOKEN_A" > "$TOKEN_B" ]]; then
    TEMP=$TOKEN_A
    TOKEN_A=$TOKEN_B
    TOKEN_B=$TEMP
    echo "Swapped TOKEN_A and TOKEN_B to ensure correct order"
fi


extract_number() {
    echo "$1" | awk '{print $1}' | sed 's/[^0-9]*//g'
}

# 获取余额并提取纯数字
BALANCE_A_FULL=$(cast call $TOKEN_A "balanceOf(address)(uint256)" $(cast wallet address --private-key $PRIVATE_KEY))
BALANCE_B_FULL=$(cast call $TOKEN_B "balanceOf(address)(uint256)" $(cast wallet address --private-key $PRIVATE_KEY))

BALANCE_A=$(extract_number "$BALANCE_A_FULL")
BALANCE_B=$(extract_number "$BALANCE_B_FULL")

echo "Token A full balance: $BALANCE_A_FULL"
echo "Token B full balance: $BALANCE_B_FULL"
echo "Token A extracted balance: $BALANCE_A"
echo "Token B extracted balance: $BALANCE_B"


ALLOWANCE_A=$(cast call $TOKEN_A "allowance(address,address)(uint256)" $(cast wallet address --private-key $PRIVATE_KEY) $POSITION_MANAGER)
ALLOWANCE_B=$(cast call $TOKEN_B "allowance(address,address)(uint256)" $(cast wallet address --private-key $PRIVATE_KEY) $POSITION_MANAGER)
echo "Token A allowance: $ALLOWANCE_A"
echo "Token B allowance: $ALLOWANCE_B"


CURRENT_SQRT_PRICE=$(cast call $POOL_ADDRESS "slot0()(uint160,int24,uint16,uint16,uint16,uint8,bool)" --rpc-url $ETH_RPC_URL | awk '{print $1}')
echo "Current sqrtPrice: $CURRENT_SQRT_PRICE"


CURRENT_TIMESTAMP=$(date +%s)
DEADLINE=$((CURRENT_TIMESTAMP + 3600))  # 1 hour


DECIMALS_A=$(cast call $TOKEN_A "decimals()(uint8)" --rpc-url $ETH_RPC_URL)
DECIMALS_B=$(cast call $TOKEN_B "decimals()(uint8)" --rpc-url $ETH_RPC_URL)
echo "Token A decimals: $DECIMALS_A"
echo "Token B decimals: $DECIMALS_B"
# Current sqrtPrice: 79228162514264337593543950336
# Token A decimals: 8
# Token B decimals: 18

AMOUNT_A=100000000  # 1 WBTC (10^8)
AMOUNT_B=1000000    # 1 FATE (10^6)

if (( $(echo "$AMOUNT_A > $BALANCE_A" | bc -l) )); then
    echo "Error: Insufficient balance for Token A"
    echo "Required: $AMOUNT_A, Available: $BALANCE_A"
    exit 1
fi

if (( $(echo "$AMOUNT_B > $BALANCE_B" | bc -l) )); then
    echo "Error: Insufficient balance for Token B"
    echo "Required: $AMOUNT_B, Available: $BALANCE_B"
    exit 1
fi

echo "Balance check passed. Proceeding with the transaction."


echo "AMOUNT_A to add: $AMOUNT_A"
echo "AMOUNT_B to add: $AMOUNT_B"

AMOUNT_A_MIN=$((AMOUNT_A * 1 / 100))  # 99% of AMOUNT_A
AMOUNT_B_MIN=$((AMOUNT_B * 1 / 100))  # 99% of AMOUNT_B

#TICK_LOWER=-180
#TICK_UPPER=180 

POOL_ADDRESS=$(cast call $FACTORY_ADDRESS "getPool(address,address,uint24)(address)" $TOKEN_A $TOKEN_B $FEE)
POOL_STATE=$(cast call $POOL_ADDRESS "slot0()(uint160,int24,uint16,uint16,uint16,uint8,bool)" --rpc-url $ETH_RPC_URL)
echo "Pool address: $POOL_ADDRESS"
echo "Pool state: $POOL_STATE"




# Print all mint parameters
echo "Mint parameters:"
echo "TOKEN_A: $TOKEN_A"
echo "TOKEN_B: $TOKEN_B"
echo "FEE: $FEE"
echo "TICK_LOWER: $TICK_LOWER"
echo "TICK_UPPER: $TICK_UPPER"
echo "AMOUNT_A: $AMOUNT_A"
echo "AMOUNT_B: $AMOUNT_B"
echo "AMOUNT_A_MIN: $AMOUNT_A_MIN"
echo "AMOUNT_B_MIN: $AMOUNT_B_MIN"
echo "RECIPIENT: $(cast wallet address --private-key $PRIVATE_KEY)"
echo "DEADLINE: $DEADLINE"


# ！！！！！！！！！！！！！！！！！ 从这里往后没有执行成功 ！！！！！！！！！！！！！！！！！

# ------------------------------------------------------------------------------------------------
# 直接与池子合约交互：

# 首先批准代币转移
cast send $TOKEN_A "approve(address,uint256)" $POOL_ADDRESS $AMOUNT_A --private-key $PRIVATE_KEY
cast send $TOKEN_B "approve(address,uint256)" $POOL_ADDRESS $AMOUNT_B --private-key $PRIVATE_KEY
ALLOWANCE_A=$(cast call $TOKEN_A "allowance(address,address)(uint256)" $(cast wallet address --private-key $PRIVATE_KEY) $POOL_ADDRESS)
ALLOWANCE_B=$(cast call $TOKEN_B "allowance(address,address)(uint256)" $(cast wallet address --private-key $PRIVATE_KEY) $POOL_ADDRESS)
echo "Token A allowance: $ALLOWANCE_A"
echo "Token B allowance: $ALLOWANCE_B"

# 然后尝试直接添加流动性
# 首先，让我们构造调用数据
CALLDATA=$(cast calldata "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))" \
"($TOKEN_A,$TOKEN_B,$FEE,$TICK_LOWER,$TICK_UPPER,$AMOUNT_A,$AMOUNT_B,$AMOUNT_A_MIN,$AMOUNT_B_MIN,$(cast wallet address --private-key $PRIVATE_KEY),$DEADLINE)")

echo "Calldata: $CALLDATA"

# 然后，使用构造的调用数据发送交易
RESULT=$(cast send $POSITION_MANAGER $CALLDATA \
--private-key $PRIVATE_KEY \
--gas-price 50000000000 \
--gas-limit 1000000 \
--rpc-url $ETH_RPC_URL \
--json)

echo "Transaction result: $RESULT"

# 检查交易是否成功
if echo "$RESULT" | jq -e '.status == "0x1"' > /dev/null; then
    echo "Transaction successful!"
else
    echo "Transaction failed. Error message:"
    echo "$RESULT" | jq '.error // "No specific error message provided"'
    echo "Full transaction result:"
    echo "$RESULT" | jq '.'
fi

# ------------------------------------------------------------------------------------------------

# cast send $POSITION_MANAGER "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))" \
# "($TOKEN_A,$TOKEN_B,$FEE,$TICK_LOWER,$TICK_UPPER,$AMOUNT_A,$AMOUNT_B,$AMOUNT_A_MIN,$AMOUNT_B_MIN,$(cast wallet address --private-key $PRIVATE_KEY),$DEADLINE)" \
# --private-key $PRIVATE_KEY \
# --gas-price 50000000000 \
# --gas-limit 5000000 \
# --rpc-url $ETH_RPC_URL



# # 使用 --json 参数获取更详细的错误信息
# RESULT=$(cast send $POSITION_MANAGER "mint((address,address,uint24,int24,int24,uint256,uint256,uint256,uint256,address,uint256))" \
# "($TOKEN_A,$TOKEN_B,$FEE,$TICK_LOWER,$TICK_UPPER,$AMOUNT_A,$AMOUNT_B,$AMOUNT_A_MIN,$AMOUNT_B_MIN,$(cast wallet address --private-key $PRIVATE_KEY),$DEADLINE)" \
# --private-key $PRIVATE_KEY \
# --gas-price 50000000000 \
# --gas-limit 5000000 \
# --rpc-url $ETH_RPC_URL \
# --json)

# echo "Transaction result: $RESULT"

# if echo "$RESULT" | jq -e '.status == "0x1"' > /dev/null; then
#     echo "Transaction successful!"
# else
#     echo "Transaction failed. Error message:"
#     echo "$RESULT" | jq '.error // "No specific error message provided"'
#     echo "Full transaction result:"
#     echo "$RESULT" | jq '.'
# fi