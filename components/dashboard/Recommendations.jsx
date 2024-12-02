import MaturityIndicator from "./MaturityIndicator";

export default function Recommendations() {
    return (
        <div className="border border-black mt-8">
            <div>
                <div>
                    <MaturityIndicator stage={2} />
                </div>
                <div></div>
            </div>
        </div>
    );
}