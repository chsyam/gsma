import React from 'react';
import { Bell } from 'lucide-react';

const NotificationDropdown = ({ notifications }) => {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-300 py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-md font-semibold text-gray-800">
                    Notifications
                </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                                }`}
                        >
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                    ))
                ) : (
                    <div className="px-4 py-6 text-center">
                        <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No notifications yet</p>
                    </div>
                )}
            </div>

            {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        Mark all as read
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;