import React, { useEffect, useState } from 'react';
import Link from "next/link";
import styles from "./../../styles/dashboard/SustainabilitySelection.module.css";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function RenderComponent({ details }) {
    const [activeQuestion, setActiveQuestion] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleActiveQuestion = (questionTitle, option, queCount) => {
        setSelectedOptions({ ...selectedOptions, [questionTitle]: [option] })
        if (activeQuestion < queCount) {
            const timer = setTimeout(() => {
                setActiveQuestion(prev => prev + 1);
            }, 200);
            return () => clearTimeout(timer);
        }
    }

    useEffect(() => {
        console.log(selectedOptions);
    }, [selectedOptions])

    return (
        <div>
            {
                details.componentType === 'input' && (
                    <div className={styles.formElement}>
                        <label className="font-semibold text-[16px]">{details.label}</label><br />
                        <input
                            type={details.inputType}
                            placeholder={details.placeholder}
                            name={details.name}
                            readOnly={details.readOnly}
                        />
                    </div>
                )
            }
            {
                details.componentType === 'text' && (
                    <div className={styles.formElement}>
                        <div className="max-w-[350px]">
                            {details.defaultValue}
                            {
                                details.externalResources &&
                                <Link href={`${details.externalResources}`} target="_blank" className="cursor-pointer italic underline font-semibold text-[#0000FF] pl-2">link</Link>
                            }
                        </div>
                    </div>
                )
            }
            {
                details.componentType === 'questions' && (
                    <div className={styles.formElement}>
                        {
                            details.questionsList.map((question, index) => {
                                return (
                                    <div key={index} className={`mb-5 ${(activeQuestion !== index + 1) && 'hidden'}`}>
                                        <div className="py-1 text-md font-semibold">
                                            {index + 1}. {question.questionTitle}
                                        </div>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            onChange={(e) => handleActiveQuestion(question.questionTitle, e.target.value, details.questionsList.length)}
                                        >
                                            {
                                                question.questionOptions.map((option, optionInd) => {
                                                    return (
                                                        <FormControlLabel key={optionInd} value={option.value} control={<Radio />} label={option.label} />
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </div>
                                )
                            })
                        }
                        <div className='flex flex-nowrap gap-4 justify-between align-center w-[100%]'>
                            {
                                activeQuestion !== 1 && (
                                    <div
                                        className='px-2 py-1 rounded-sm bg-[#549B79] flex justify-center gap-2 align-center flex-nowrap text-[#FFF] cursor-pointer'
                                        onClick={() => setActiveQuestion(prev => prev - 1)}
                                    >
                                        <ArrowLeft color='#FFF' /> Prev
                                    </div>
                                )
                            }
                            {
                                activeQuestion !== details.questionsList.length && (
                                    <div
                                        className='px-4 py-1 rounded-sm bg-[#549B79] flex justify-center gap-2 align-center flex-nowrap text-[#FFF] cursor-pointer'
                                        onClick={() => setActiveQuestion(prev => prev + 1)}
                                    >
                                        Next <ArrowRight color='#FFF' />
                                    </div>
                                )
                            }
                        </div>
                    </div >
                )
            }
        </div >
    );
}