import { TickBasedHeuristicGasModelFactory } from '../tick-based-heuristic-gas-model';
export class V4HeuristicGasModelFactory extends TickBasedHeuristicGasModelFactory {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjQtaGV1cmlzdGljLWdhcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2FscGhhLXJvdXRlci9nYXMtbW9kZWxzL3Y0L3Y0LWhldXJpc3RpYy1nYXMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFdEYsTUFBTSxPQUFPLDBCQUNYLFNBQVEsaUNBQXdEO0lBR2hFLFlBQVksUUFBc0I7UUFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQ3pCLE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFdBQVcsRUFDWCxVQUFVLEVBQ1YsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixjQUFjLEdBQ2tCO1FBR2hDLE9BQU8sTUFBTSxLQUFLLENBQUMscUJBQXFCLENBQUM7WUFDdkMsT0FBTztZQUNQLFdBQVc7WUFDWCxLQUFLO1lBQ0wsV0FBVztZQUNYLFVBQVU7WUFDVixjQUFjO1lBQ2QsaUJBQWlCO1lBQ2pCLGNBQWM7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YifQ==