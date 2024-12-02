import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./../../styles/dashboard/SustainabilitySelection.module.css";
import { find } from "lodash"
import RenderComponent from "./RenderComponent";
import areas from "./../../public/data/areas.json"

export default function SustainabilitySelection({ currentLevel, levels, setLevels }) {
    const [filteredLabels, setFilteredLabels] = useState(['Analysis & Design']);
    const handleLabelClick = (label) => {
        if (filteredLabels.includes(label)) {
            let temp = [];
            filteredLabels.map((item) => item !== label && temp.push(item));
            setFilteredLabels(temp);
        } else {
            setFilteredLabels([...filteredLabels, label])
        }
    }

    const [assessmentAreas, setAssessmentAreas] = useState([]);
    useEffect(() => {
        let temp = [];
        Object.keys(areas).map((item, index) => (
            filteredLabels.includes(item) && temp.push(...areas[item]['assessmentAreas'])
        ))
        setAssessmentAreas(temp);
    }, [filteredLabels])

    const [selectedAssessments, setSelectedAssessments] = useState([]);
    const handleSelection = (assessmentArea) => {
        const result = find(selectedAssessments, function (item) {
            if (item.title === assessmentArea.title) {
                return true;
            }
        })

        if (result) {
            let temp = [];
            selectedAssessments.map((item) => item !== assessmentArea && temp.push(item));
            setSelectedAssessments(temp);
        } else {
            setSelectedAssessments([...selectedAssessments, assessmentArea])
        }
    }

    const findObject = (assessmentObj) => {
        return find(selectedAssessments, function (item) {
            if (item.title === assessmentObj.title) {
                return true;
            }
        })
    }

    const handleSaveNext = () => {
        const temp = [];
        Object.keys(levels).map((key, index) => {
            if (currentLevel.sectionNumber == levels[key].sectionNumber) {
                const currentLevelObject = levels[key];
                currentLevelObject["isCompleted"] = true;
                currentLevelObject["isActive"] = false;
                temp.push(currentLevelObject);
            } else if (currentLevel.sectionNumber + 1 == levels[key].sectionNumber) {
                const nextLevelObject = levels[key];
                nextLevelObject["isActive"] = true;
                temp.push(nextLevelObject);
            } else {
                temp.push(levels[key])
            }
        })
        setLevels(temp);
    }

    return (
        <div className={styles.SustainabilitySelectionContainer}>
            <div className={styles.areaSelectionContainer}>
                <div className={styles.addingAreas}>
                    <div className={styles.areaSection}>
                        {
                            Object.keys(areas).map((area, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => handleLabelClick(areas[area]['label'])}
                                        className={`${styles.area}`}
                                        style={{ backgroundColor: `${filteredLabels.includes(areas[area]['label']) ? '#549B79' : '#DDE1E6'}`, color: `${filteredLabels.includes(areas[area]['label']) ? '#FFF' : '#000'}` }}
                                    >
                                        {areas[area]['label']}
                                    </div>
                                );
                            })
                        }
                    </div>
                    {
                        assessmentAreas.length === 0 ? (
                            <div className="text-center text-md my-[100px] font-semibold">
                                No areas to assessment. Try selecting other areas
                            </div>
                        ) : (
                            <table className="mt-6">
                                <tbody>
                                    {
                                        assessmentAreas.map((assessmentArea, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='py-3 pr-2'>
                                                        <div className="font-semibold"
                                                            style={{ color: `${findObject(assessmentArea) ? '#549B79' : '#000'}` }}
                                                        >{assessmentArea.title}</div>
                                                        <div className={styles.description}
                                                            style={{ color: `${findObject(assessmentArea) ? '#549B79' : '#000'}` }}
                                                        >{assessmentArea.description}</div>
                                                    </td>
                                                    <td>
                                                        <div className="cursor-pointer border border-black"
                                                            onClick={() => handleSelection(assessmentArea)}
                                                            style={{
                                                                display: `${findObject(assessmentArea) ? 'none' : 'block'}`
                                                            }}
                                                        >
                                                            <Plus size={18} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
                <div className={styles.selectedAreas}>
                    <div className="text-[#549B79] font-bold text-[16px] leading-6">
                        Selected Assessment Areas:
                    </div>
                    {
                        selectedAssessments.length === 0 ? (
                            <div className="text-center my-[100px]">
                                <span className="font-semibold">Choose Areas for Assessment</span><br />
                                <span className="text-sm">Using the Left tabs</span>
                            </div>
                        ) : (
                            <div>
                                {
                                    selectedAssessments.map((item, index) => {
                                        return (
                                            <div key={index} className='py-4'>
                                                <div className="flex justify-between font-semibold flex-wrap text-md items-center pl-4 bg-[#DDE1E6]">
                                                    <div>{item.title}</div>
                                                    <div
                                                        className="cursor-pointer rounded-full p-3 hover:bg-[#ef9696] ease-in-out duration-300"
                                                        onClick={() => handleSelection(item)}
                                                    >
                                                        <Trash2 size={20} color="red" />
                                                    </div>
                                                </div>
                                                <div className="my-4">
                                                    <form className="px-4">
                                                        {
                                                            item?.componentList?.map((component, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <RenderComponent details={component} />
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </form>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <div className="rounded-md bg-[#549B79] px-4 py-2 mt-6 w-fit text-[#FFF] cursor-pointer"
                                    onClick={() => { handleSaveNext() }}
                                >
                                    Start Analyzing
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}