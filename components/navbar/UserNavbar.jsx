import React, { useEffect, useState } from "react";
import styles from "./UserNavbar.module.css"
import { Bell, ChevronDown, User } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function UserNavbar({ username }) {
    const [notificationCount, setNotificationCount] = useState(0);
    const [markAllRead, setMarkAllRead] = useState(false);

    const mockNotifications = [
        {
            id: '1',
            message: 'Your project started sustainability analysis',
            time: 'few minutes ago',
            isRead: false,
        },
        {
            id: '2',
            message: 'Your project analysis failed',
            time: '1 hour ago',
            isRead: false,
        }
    ];
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleClickOutside = () => {
        setShowNotifications(false);
        setShowProfile(false);
    };

    useEffect(() => {
        if (markAllRead) {
            setNotificationCount(0);
            localStorage.setItem('markAllRead', 0);
        } else {
            const storedCount = localStorage.getItem('markAllRead');
            if (storedCount)
                setNotificationCount(parseInt(storedCount));
            else
                setNotificationCount(mockNotifications.length);
        }
    }, [mockNotifications, markAllRead])

    return (
        <nav className={`relative z-50 ${styles.navbarContainer}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => window.location.href = "/"}
                    >
                        <span className="text-3xl text-white font-bold text-[#4caf50] drop-shadow-2xl"
                            style={{
                                textShadow: '4px 4px 6px rgba(0,0,0,0.3)',
                                letterSpacing: '5px'
                            }}
                        >
                            GTMA
                        </span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => {
                                    setShowProfile(false);
                                    setShowNotifications(!showNotifications);
                                }}
                            >
                                <Bell className="h-6 w-6" />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {notificationCount > 99 ? '99+' : notificationCount}
                                    </span>
                                )}
                            </button>
                            {showNotifications &&
                                <NotificationDropdown notifications={mockNotifications} setMarkAllRead={setMarkAllRead} />
                            }
                        </div>

                        <div className="relative">
                            <button
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => {
                                    setShowNotifications(false);
                                    setShowProfile(!showProfile);
                                }}
                            >
                                <User className="h-6 w-6" />
                                <span className="text-md font-bold text-black">
                                    {username}
                                </span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {showProfile && <ProfileDropdown />}
                        </div>
                    </div>
                </div>
            </div>
            {(showNotifications || showProfile) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={handleClickOutside}
                />
            )}
        </nav>
    );
}