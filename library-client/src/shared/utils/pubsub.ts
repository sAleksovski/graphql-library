interface SubscribersMap {
  [key: string]: Function[];
}

function PubSubImpl() {
  let subscribersMap: SubscribersMap = {};

  function on(key: string, handler: Function) {
    subscribersMap[key] = [...(subscribersMap[key] || []), handler];
  }

  function off(key: string, handler: Function) {
    subscribersMap[key] = (subscribersMap[key] || []).filter((sub) => sub !== handler);
  }

  function emit(key: string, value?: any) {
    (subscribersMap[key] || []).forEach((sub) => sub(value));
  }

  return {
    on,
    off,
    emit,
  };
}

export const PubSub = PubSubImpl();
