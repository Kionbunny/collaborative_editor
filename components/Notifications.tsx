'use client';

import { useUser } from '@clerk/clerk-react';
import { useInboxNotifications } from '@liveblocks/react/suspense';
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui';
import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { user } = useUser();

  console.log({ user });

  return (
    <Popover>
      <PopoverTrigger className="flex size-10 items-center justify-center rounded-lg">
        <Image
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={24}
          height={24}
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[460px] border-none bg-dark-200 shadow-lg"
      >
        <InboxNotificationList>
          {inboxNotifications.length <= 0 && (
            <p className="py-2 text-center text-dark-500">
              No notifications yet
            </p>
          )}

          {inboxNotifications.length > 0 &&
            inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
                className="bg-dark-200 text-white"
                href={`/documents/${inboxNotification.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread
                      {...props}
                      showRoomName={false}
                      showActions={false}
                    />
                  ),
                }}
              />
            ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
};
