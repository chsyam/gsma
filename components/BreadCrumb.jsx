import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { ChevronRight, House } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BreadCrumb() {
    const handleClick = (event) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };
    const [breadCrumbs, setBreadCrumbs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        let path = window.location.href;
        let origin = window.location.origin;
        console.log(path.replace(origin, ""));
        console.log(window.location.search)
        console.log(decodeURIComponent(decodeURIComponent(window.location.search)).replace('?', '').split('&'))
    }, []);

    return (
        <div>
            <Breadcrumbs separator={<ChevronRight />} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/dashboard">
                    <House color="#000" />
                </Link>
                {
                    breadCrumbs.map((item, index) => {
                        return (
                            (index !== 0 && index !== breadCrumbs.length - 1) && <Link underline="hover" key={index} color="inherit" href={`/${item}`}>
                                {item}
                            </Link>
                        )
                    })
                }
                <Typography sx={{ color: 'text.primary' }}>
                    {
                        breadCrumbs.length > 1 && breadCrumbs[breadCrumbs.length - 1]
                    }
                </Typography>
            </Breadcrumbs>
        </div>
    );
}