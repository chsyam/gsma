import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./../../styles/dashboard/SustainabilitySelection.module.css";
import { find } from "lodash"
import RenderComponent from "./RenderComponent";
import areas from "./../../public/data/areas.json"

export default function SustainabilitySelection({ currentLevel, levels, setLevels, newProjectForm,
    setNewProjectForm, setSuccessShowPopup, setFailureShowPopup
}) {
    const [filteredLabels, setFilteredLabels] = useState(['Analysis & Design']);
    const [analyzingStatus, setAnalyzingStatus] = useState(false);

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

    const handleAnalyzeApplictaion = async () => {
        setAnalyzingStatus(true);

        try {
            const res = await fetch('/api/applications/analyzeNewProject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newProjectForm }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const result = await res.json();
            console.log(result);
            setSuccessShowPopup(true);
        } catch (error) {
            setFailureShowPopup(true);
            console.log(error);
        }
        setAnalyzingStatus(false);
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
                                                    {
                                                        item?.componentList?.map((component, index) => {
                                                            return (
                                                                <RenderComponent key={index} details={component} newProjectForm={newProjectForm} setNewProjectForm={setNewProjectForm} />
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <div className="rounded-md bg-[#549B79] px-4 py-2 mt-6 w-fit text-[#FFF] cursor-pointer"
                                    onClick={() => {
                                        handleAnalyzeApplictaion()
                                    }}
                                >
                                    {
                                        analyzingStatus ? (
                                            <div className="flex justify-center items-center flex-nowrap">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-2"></div> Analyzing...
                                            </div>
                                        ) : (
                                            "Start Analyzing"
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}