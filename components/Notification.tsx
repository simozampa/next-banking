import { NotificationType } from "@/utils/types";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export default function Notification({
  type,
  message,
}: {
  type: NotificationType;
  message: string;
}) {
  const getNotificationIconFromType = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ERROR:
        return (
          <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
        );
      case NotificationType.CONFIRMATION:
        return (
          <CheckCircleIcon
            aria-hidden="true"
            className="size-5 text-green-400"
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div
      className={classNames(
        "absolute bottom-10 left-1/2 -x-translate-1/2 rounded-md p-4",
        type === NotificationType.ERROR ? "bg-red-50" : "bg-green-50"
      )}
    >
      <div className="flex">
        <div className="shrink-0">{getNotificationIconFromType(type)}</div>
        <div className="ml-3">
          <h3
            className={classNames(
              "text-sm font-medium",
              type === NotificationType.ERROR
                ? "text-red-800"
                : "text-green-800"
            )}
          >
            {message}
          </h3>
        </div>
      </div>
    </div>
  );
}
