/// <reference types="vite/client" />

interface Window {
  Telegram?: {
    WebApp?: {
      MainButton: {
        setText: (text: string) => void;
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        enable: () => void;
        disable: () => void;
        showProgress: (leaveActive: boolean) => void;
        hideProgress: () => void;
        setParams: (params: any) => void;
      };
      close: () => void;
      expand: () => void;
      ready: () => void;
      isExpanded: boolean;
      initData: string;
      initDataUnsafe: any;
      colorScheme: string;
      themeParams: any;
      onEvent: (eventType: string, eventHandler: () => void) => void;
      offEvent: (eventType: string, eventHandler: () => void) => void;
      sendData: (data: any) => void;
      openLink: (url: string) => void;
      openTelegramLink: (url: string) => void;
      setHeaderColor: (color: string) => void;
      BackButton: {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
      };
      HapticFeedback: {
        impactOccurred: (style: string) => void;
        notificationOccurred: (type: string) => void;
        selectionChanged: () => void;
      };
      CloudStorage: {
        getItem: (key: string) => Promise<string | null>;
        setItem: (key: string, value: string) => Promise<void>;
        removeItem: (key: string) => Promise<void>;
        getItems: (keys: string[]) => Promise<Record<string, string | null>>;
        removeItems: (keys: string[]) => Promise<void>;
        getKeys: () => Promise<string[]>;
      };
    };
  };
}