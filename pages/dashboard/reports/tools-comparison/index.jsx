import { decrypt } from "./../../../api/auth/lib";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import toolsComparison from "./../../../../public/data/tools_comparison.json";
import { useState } from "react";

export default function ToolsComparison() {
    console.log(toolsComparison);
    const [expandedPanels, setExpandedPanels] = useState({});

    return (
        <div>
            <div>
                {
                    Object.keys(toolsComparison)?.map((area, index) => {
                        return (
                            <Accordion
                                expanded={expandedPanels[index] ? true : false}
                                key={index}
                                onChange={() => handleExpand(index)}
                                sx={{
                                    backgroundColor: expandedPanels[index] ? '#F8F8F80D' : '#3E3E440D',
                                    boxShadow: 'none',
                                    margin: '4px 0',
                                    borderTopLeftRadius: expandedPanels[index] ? '18px' : '4px',
                                    borderTopRightRadius: expandedPanels[index] ? '18px' : '4px',
                                    borderBottomLeftRadius: expandedPanels[index] ? '6px' : '4px',
                                    borderBottomRightRadius: expandedPanels[index] ? '6px' : '4px'
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ChevronDown color="#000" />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{ fontSize: '14px', fontWeight: '500', backgroundColor: expandedPanels[index] ? '#549B79' : '3E3E440D', borderRadius: '4px' }}
                                >
                                    {toolsComparison[area].areaName}
                                    <span className="px-2 tracking-widest font-semibold">({toolsComparison[area].implementedAreas}/{toolsComparison[area].totalAreas})</span>
                                </AccordionSummary>
                                <AccordionDetails sx={{ backgroundColor: '#F8F8F80D' }}>
                                    <div className="flex justify-center align-center gap-8 flex-wrap px-4 py-4">
                                        <div className="flex-grow">
                                            <div className="font-semibold text-[16px]">
                                                Sustainability Passed Areas
                                            </div>
                                            <div className="px-4">
                                                {
                                                    toolsComparison[area].passedAreas?.length === 0 ? (
                                                        <div className="text-[16px] font-medium my-8 text-[#F35E4A] cursor-pointer">
                                                            No Passed Areas
                                                        </div>
                                                    ) : (
                                                        toolsComparison[area].passedAreas?.map((item, index) => {
                                                            return (
                                                                <div key={index} onClick={() => endPointHandler(item)} className={`flex justify-between flex-nowrap items-center gap-2 my-4 ${endPoints.hasOwnProperty(item) && 'hover:underline'} underline-offset-4`}>
                                                                    <div className="text-[16px] font-medium text-[#549B79] cursor-pointer">
                                                                        - {item}
                                                                    </div>
                                                                    <ExternalLink size={22}
                                                                        color="#549B79"
                                                                        style={{ cursor: 'pointer' }}
                                                                    />
                                                                </div>
                                                            );
                                                        })
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-semibold text-[16px]">Failed Areas</div>
                                            <div className="px-4">
                                                {
                                                    toolsComparison[area].failedAreas?.length === 0 ? (
                                                        <div className="text-[16px] font-medium my-8 text-[#549B79] cursor-pointer">
                                                            No Failed Areas
                                                        </div>
                                                    ) : (
                                                        toolsComparison[area].failedAreas?.map((item, index) => {
                                                            return (
                                                                <div key={index} className="flex justify-between flex-nowrap items-center gap-2 my-4">
                                                                    <div className={`text-[16px] font-medium text-[#F35E4A] ${endPoints.hasOwnProperty(item) && 'cursor-pointer hover:underline'} underline-offset-4`}>
                                                                        - {item}
                                                                    </div>
                                                                    {
                                                                        endPoints.hasOwnProperty(item) && (
                                                                            <ExternalLink size={22}
                                                                                color="#F35E4A"
                                                                                style={{ cursor: 'pointer' }}
                                                                            />
                                                                        )
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                }
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, res } = context;

    const token = req?.cookies['token']
    const payload = await decrypt(token)
    if (!payload || payload === null || payload === undefined) {
        res.setHeader('Set-Cookie', [
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;',
        ]);
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        return {
            props: {
                username: payload?.username,
                email: payload?.email,
                role: payload?.role
            }
        }
    }
}