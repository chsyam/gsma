import React, { useEffect, useState } from "react";
import styles from "./UserNavbar.module.css"
import { Bell, ChevronDown, User } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function UserNavbar() {
    const [notificationCount, setNotificationCount] = useState(0);
    const mockNotifications = [
        {
            id: '1',
            message: 'Your project "Website Redesign" has been approved',
            time: '5 minutes ago',
            isRead: false,
        },
        {
            id: '2',
            message: 'New comment on your post',
            time: '1 hour ago',
            isRead: false,
        },
        {
            id: '3',
            message: 'You have a new follower',
            time: '2 hours ago',
            isRead: true,
        },
        {
            id: '4',
            message: 'Meeting reminder: Team sync at 2 PM',
            time: '3 hours ago',
            isRead: true,
        },
    ];
    const [mouseEnter, setMouseEnter] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleClickOutside = () => {
        setShowNotifications(false);
        setShowProfile(false);
    };

    useEffect(() => {
        setNotificationCount(mockNotifications.length)
    }, [mockNotifications])

    return (
        <nav className={`relative z-50 ${styles.navbarContainer}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-2">
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
                                <Bell color="white" className="h-6 w-6 text-gray-600" />
                                {notificationCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {notificationCount > 99 ? '99+' : notificationCount}
                                    </span>
                                )}
                            </button>
                            {showNotifications &&
                                <NotificationDropdown notifications={mockNotifications} />
                            }
                        </div>

                        <div className="relative"
                            onMouseEnter={() => setMouseEnter(true)}
                            onMouseLeave={() => setMouseEnter(false)}
                        >
                            <button
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => {
                                    setShowNotifications(false);
                                    setShowProfile(!showProfile);
                                }}
                            >
                                <User color={mouseEnter ? '#4caf50' : `white`} className="h-6 w-6 text-gray-600" />
                                <span className="text-md font-bold text-white hover:text-[#4caf50]">{"chsyamkumar"}</span>
                                <ChevronDown color={mouseEnter ? '#4caf50' : `white`} className="h-4 w-4 text-gray-500" />
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