import styles from "./ToolsComparison.module.css";

export default function ToolsComparisonComponent({ dockerDetails, setPopupData, setOpen, toolIcons }) {
    console.log("dockerDetails", dockerDetails)
    const getEnergyUsageClass = (value) => {
        switch (value) {
            case "high":
                return styles.danger;
            case "low":
                return styles.success;
            case "medium":
                return styles.warning;
            default:
                return "";
        }
    }

    const handleToolClick = (tool) => {
        setPopupData({ ...tool });
        setOpen(true);
    }

    return (
        <div className="flex justify-left gap-5 flex-wrap items-center mt-3">
            {
                Object.keys(dockerDetails)?.map((title, ind) => {
                    return (
                        <div key={ind}>
                            {
                                title !== "NA" && (
                                    <div className={styles.title}>{title}</div>
                                )
                            }
                            <div className="flex-1 flex justify-left gap-5 flex-wrap items-center mt-3">
                                {
                                    dockerDetails[title]?.map((tool, j) => {
                                        return (
                                            <div onClick={() => handleToolClick(tool)} key={j} className="bg-white min-w-[300px] rounded-md py-6 px-6 shadow-lg cursor-pointer">
                                                <div className={styles.title}>
                                                    {
                                                        toolIcons[tool?.icon] &&
                                                        toolIcons[tool?.icon]
                                                    }
                                                    {tool?.title}
                                                </div>
                                                <div>
                                                    {
                                                        tool["basicMetrics"] && Object.keys(tool["basicMetrics"]).map((key, i) => {
                                                            return (
                                                                <div key={i} className={styles.energyUsage}>
                                                                    <div>
                                                                        {key}
                                                                    </div>
                                                                    {
                                                                        Object.keys(tool).length !== 0 && (
                                                                            <div className={getEnergyUsageClass(tool["basicMetrics"][key]?.status)}
                                                                            >
                                                                                {tool["basicMetrics"][key]?.value}
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}