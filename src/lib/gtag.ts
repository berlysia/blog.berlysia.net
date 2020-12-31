export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const gaEnabled = Boolean(GA_ID);

export const sendPageView = (path: string) => {
  if (!gaEnabled) {
    return;
  }

  (window as any).gtag("config", GA_ID, {
    page_path: path,
  });
};

type Event = {
  action: string;
  category: string;
  label: string;
  value?: string;
};

export const sendEvent = ({ action, category, label, value = "" }: Event) => {
  if (!gaEnabled) {
    return;
  }

  (window as any).gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
