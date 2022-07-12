import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notification) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  function showNotificationHandler(notification) {
    setActiveNotification(notification);
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
