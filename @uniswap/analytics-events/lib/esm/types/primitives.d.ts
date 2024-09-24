/**
 * General event names that can be reused across products.
 */
export declare enum SharedEventName {
    ANALYTICS_SWITCH_TOGGLED = "Analytics Switch Toggled",
    APP_LOADED = "Application Loaded",
    ELEMENT_CLICKED = "Element Clicked",
    FOOTER_CLICKED = "Footer Clicked",
    HEARTBEAT = "Heartbeat",
    MENU_CLICKED = "Menu Clicked",
    NAVBAR_CLICKED = "Navbar Clicked",
    PAGE_CLICKED = "Page Clicked",
    PAGE_VIEWED = "Page Viewed",
    SEARCH_BAR_CLICKED = "Search Bar Clicked",
    SENTIMENT_SUBMITTED = "Sentiment Submitted",
    TERMS_OF_SERVICE_ACCEPTED = "Terms of Service Accepted",
    WEB_VITALS = "Web Vitals"
}
/**
 * Known events that trigger callbacks.
 * @example
 *  <TraceEvent events={[BrowserEvent.onClick]} element={name}>
 */
export declare enum BrowserEvent {
    onClick = "onClick",
    onFocus = "onFocus",
    onKeyPress = "onKeyPress",
    onSelect = "onSelect"
}
export declare enum Browser {
    BRAVE = "Brave",
    CHROME = "Google Chrome or Chromium",
    EDGE = "Microsoft Edge (Legacy)",
    EDGE_CHROMIUM = "Microsoft Edge (Chromium)",
    FIREFOX = "Mozilla Firefox",
    INTERNET_EXPLORER = "Microsoft Internet Explorer",
    OPERA = "Opera",
    SAFARI = "Apple Safari",
    SAMSUNG = "Samsung Internet",
    UNKNOWN = "unknown"
}
export declare function getBrowser(): string;
export declare enum CustomUserProperties {
    ALL_WALLET_ADDRESSES_CONNECTED = "all_wallet_addresses_connected",
    ALL_WALLET_CHAIN_IDS = "all_wallet_chain_ids",
    BROWSER = "browser",
    CHAIN_ID = "chain_id",
    DARK_MODE = "is_dark_mode",
    EXPERT_MODE = "is_expert_mode",
    GIT_COMMIT_HASH = "git_commit_hash",
    PEER_WALLET_AGENT = "peer_wallet_agent",
    ROUTER_PREFERENCE = "router_preference",
    SCREEN_RESOLUTION_HEIGHT = "screen_resolution_height",
    SCREEN_RESOLUTION_WIDTH = "screen_resolution_width",
    USER_AGENT = "user_agent",
    WALLET_ADDRESS = "wallet_address",
    WALLET_NAME = "wallet_name",
    WALLET_TYPE = "wallet_type",
    WALLET_VERSION = "wallet_version"
}
//# sourceMappingURL=primitives.d.ts.map