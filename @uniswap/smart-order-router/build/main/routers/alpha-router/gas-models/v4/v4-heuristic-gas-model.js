"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V4HeuristicGasModelFactory = void 0;
const tick_based_heuristic_gas_model_1 = require("../tick-based-heuristic-gas-model");
class V4HeuristicGasModelFactory extends tick_based_heuristic_gas_model_1.TickBasedHeuristicGasModelFactory {
    constructor(provider) {
        super(provider);
    }
    async buildGasModel({ chainId, gasPriceWei, pools, amountToken, quoteToken, v2poolProvider, l2GasDataProvider, providerConfig, }) {
        return await super.buildGasModelInternal({
            chainId,
            gasPriceWei,
            pools,
            amountToken,
            quoteToken,
            v2poolProvider,
            l2GasDataProvider,
            providerConfig,
        });
    }
}
exports.V4HeuristicGasModelFactory = V4HeuristicGasModelFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjQtaGV1cmlzdGljLWdhcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2FscGhhLXJvdXRlci9nYXMtbW9kZWxzL3Y0L3Y0LWhldXJpc3RpYy1nYXMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0Esc0ZBQXNGO0FBRXRGLE1BQWEsMEJBQ1gsU0FBUSxrRUFBd0Q7SUFHaEUsWUFBWSxRQUFzQjtRQUNoQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFDekIsT0FBTyxFQUNQLFdBQVcsRUFDWCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFDVixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGNBQWMsR0FDa0I7UUFHaEMsT0FBTyxNQUFNLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztZQUN2QyxPQUFPO1lBQ1AsV0FBVztZQUNYLEtBQUs7WUFDTCxXQUFXO1lBQ1gsVUFBVTtZQUNWLGNBQWM7WUFDZCxpQkFBaUI7WUFDakIsY0FBYztTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQS9CRCxnRUErQkMifQ==