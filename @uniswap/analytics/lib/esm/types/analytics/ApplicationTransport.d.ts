import { BaseTransport } from '@amplitude/analytics-core';
import { Payload, Response, Transport } from '@amplitude/analytics-types';
export declare enum OriginApplication {
    DOCS = "docs",
    INFO = "info",
    INTERFACE = "interface",
    MOBILE = "mobile-analytics-uniswap",
    ORG = "org"
}
/**
 * A custom Transport layer that sets `x-origin-application` to route the application to its Amplitude project
 *
 * @param originApplication Name of the application consuming the package. Used to route events to its project.
 *
 * See example here: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
 */
export declare class ApplicationTransport extends BaseTransport implements Transport {
    private originApplication;
    private reportOriginCountry?;
    private shouldReportOriginCountry;
    constructor(originApplication: OriginApplication, reportOriginCountry?: ((country: string) => void) | undefined);
    send(serverUrl: string, payload: Payload): Promise<Response | null>;
}
//# sourceMappingURL=ApplicationTransport.d.ts.map