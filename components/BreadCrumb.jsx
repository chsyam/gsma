import { Breadcrumbs, Link, Typography } from "@mui/material";
import { ChevronRight, House } from "lucide-react";
import { useEffect, useState } from "react";

export default function BreadCrumb({ urlParts }) {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        let breadCrumbItems = [];

        urlParts?.map((item, index) => {
            let temp = [];
            let decodedItem = decodeURIComponent(decodeURIComponent(item))
            if (decodedItem.includes('?')) {
                let params = decodedItem.split('?');
                params.map(param => {
                    if (param.includes('=')) {
                        let p = param.split('=');
                        temp.push(p[1].toLowerCase());
                    } else {
                        temp.push(param.toLowerCase());
                    }
                })
            }
            temp.length === 0 ? breadCrumbItems.push(decodedItem.toLowerCase()) : breadCrumbItems.push(...temp);
        })
        setParts(breadCrumbItems);
    }, [])

    const getBreadCrumbName = (item) => {
        if (item === "add") {
            return "Analyze new project"
        }
        else {
            return item;
        }
    }

    return (
        <div className="bg-[#e7e7e7] px-[2%] py-2 border-b border-[#dadada]">
            <Breadcrumbs separator={<ChevronRight />} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/dashboard">
                    <House size={20} color="#000" />
                </Link>
                {
                    parts?.map((item, index) => {
                        return (
                            (index !== 0 && index !== parts?.length - 1) && (
                                <Link underline="none" key={index} color="inherit">
                                    {getBreadCrumbName(item)}
                                </Link>
                            )
                        )
                    })
                }
                <Typography sx={{ color: 'text.primary' }}>
                    {
                        parts?.length > 1 && getBreadCrumbName(parts[parts?.length - 1])
                    }
                </Typography>
            </Breadcrumbs>
        </div>
    );
}