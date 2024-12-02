import * as React from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Typography } from "@mui/joy";

export default function MaturityIndicator({ stage }) {
    const stages = {
        1: {
            label: "Low",
            level: "01",
            bgColor: "#CD2D2E",
            rectWidth: 0,
            indicatorVisible: stage === 1
        },
        2: {
            label: "Low",
            level: "02",
            bgColor: "#ED6B4D",
            rectWidth: 0,
            indicatorVisible: stage === 2
        },
        3: {
            label: "Low",
            level: "03",
            bgColor: "#FFBD19",
            rectWidth: 0,
            indicatorVisible: stage === 3
        },
        4: {
            label: "Low",
            level: "04",
            bgColor: "#35CD2DAB",
            rectWidth: 0,
            indicatorVisible: stage === 4
        },
        5: {
            label: "Low",
            level: "05",
            bgColor: "#47B900",
            rectWidth: 0,
            indicatorVisible: stage === 5
        }
    }
    return (
        <svg
            width="350"
            height="300"
            viewBox="0 0 382 300"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* arc 1 */}
            <path
                d="M82.054 117.326C78.9526 115.375 74.8445 116.245 72.973 119.395C62.177 137.566 55.9706 157.974 54.8647 178.935C54.6667 182.688 57.7327 185.737 61.4914 185.737C65.2503 185.737 68.2765 182.687 68.4965 178.935C69.5695 160.636 74.9622 142.823 84.2538 126.882C86.1641 123.605 85.265 119.345 82.054 117.326Z"
                fill="#CD2D2E"
            />
            {
                stages[1].indicatorVisible &&
                <path
                    d="M87.1416 127.231C87.1416 132.942 82.3589 137.731 76.2593 137.731C70.1596 137.731 65.377 132.942 65.377 127.231C65.377 121.521 70.1596 116.731 76.2593 116.731C82.3589 116.731 87.1416 121.521 87.1416 127.231Z"
                    fill="white"
                    stroke="#323238"
                    strokeWidth="7"
                />}

            {/* arc 2 */}
            <path
                d="M147.107 67.2153C145.843 63.7872 141.964 62.0002 138.498 63.4042C118.569 71.4784 100.896 84.0527 86.9433 100.085C84.4964 102.897 85.0673 107.084 88.054 109.305C91.0407 111.527 95.3108 110.94 97.7737 108.142C110.095 94.1437 125.585 83.1152 143.022 75.9257C146.511 74.4875 148.383 70.6748 147.107 67.2153Z"
                fill="#ED6B4D"
            />
            {
                stages[2].indicatorVisible &&
                <path
                    d="M152.5 75C152.5 80.711 147.717 85.5 141.617 85.5C135.518 85.5 130.735 80.711 130.735 75C130.735 69.289 135.518 64.5 141.617 64.5C147.717 64.5 152.5 69.289 152.5 75Z"
                    fill="white"
                    stroke="#323238"
                    strokeWidth="7"
                    transform="translate(-4,-5)"
                />
            }

            {/* arc 3 */}
            <path
                d="M229.477 65.7644C230.619 62.222 228.597 58.3887 224.943 57.4673C204.013 52.1887 182.088 51.8395 160.99 56.4502C157.406 57.2334 155.35 60.881 156.352 64.4076C157.353 67.9342 161.032 70.0027 164.62 69.2384C183.278 65.2645 202.634 65.5923 221.138 70.1959C224.687 71.0788 228.368 69.2028 229.477 65.7644Z"
                fill="#FFBD19"
            />
            {
                stages[3].indicatorVisible &&
                <path
                    d="M236.5 65C236.5 70.711 231.717 75.5 225.617 75.5C219.518 75.5 214.735 70.711 214.735 65C214.735 59.289 219.518 54.5 225.617 54.5C231.717 54.5 236.5 59.289 236.5 65Z"
                    fill="white"
                    stroke="#323238"
                    strokeWidth="7"
                    transform="translate(-9,-1)"
                />
            }

            {/* arc 4 */}
            <path
                d="M294.728 111.032C297.79 108.83 298.475 104.586 296.084 101.746C282.381 85.4698 264.89 72.6027 245.062 64.2142C241.683 62.7849 237.805 64.548 236.478 67.971C235.15 71.3941 236.876 75.1792 240.247 76.6264C257.707 84.1234 273.129 95.4893 285.278 109.815C287.618 112.574 291.744 113.177 294.728 111.032Z"
                fill="#35CD2D"
                fillOpacity="0.67"
            />
            {
                stages[4].indicatorVisible &&
                <path
                    d="M300.5 110C300.5 115.711 295.717 120.5 289.617 120.5C283.518 120.5 278.735 115.711 278.735 110C278.735 104.289 283.518 99.5 289.617 99.5C295.717 99.5 300.5 104.289 300.5 110Z"
                    fill="white"
                    stroke="#323238"
                    strokeWidth="7"
                    transform="translate(-4,-10)"
                />
            }

            {/* arc 5 */}
            <path
                d="M320.183 185.356C323.916 185.345 326.931 182.395 326.733 178.749C325.596 157.769 319.348 137.352 308.509 119.186C306.601 115.987 302.35 115.099 299.2 117.094C296.049 119.089 295.193 123.212 297.083 126.421C306.491 142.395 311.972 160.276 313.095 178.657C313.32 182.353 316.398 185.367 320.183 185.356Z"
                fill="#47B900"
            />
            {
                stages[5].indicatorVisible &&
                <path
                    d="M326.5 178C326.5 183.711 321.717 188.5 315.617 188.5C309.518 188.5 304.735 183.711 304.735 178C304.735 172.289 309.518 167.5 315.617 167.5C321.717 167.5 326.5 172.289 326.5 178Z"
                    fill="white"
                    stroke="#323238"
                    strokeWidth="7"
                    transform="translate(5,-6)"
                />
            }

            <text
                x="130"
                y="130"
                fill="#000"
                fontWeight="500"
                fontSize="18"
            >
                Maturity Level
            </text>
            <text x="155" y="200" fill="black" stroke="black" fontSize="60" style={{ fontWeight: '600' }}>
                {stages[stage].level}
            </text>
            <rect x="155" y="230" width="70" height="40" rx="20" fill={`${stages[stage].bgColor}`} />
            <text
                x="170"
                y="255"
                fill="#FFF"
                fontWeight="600"
                fontSize="20"
            >
                {stages[stage].label}
            </text>
        </svg>
    );
}
