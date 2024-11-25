import Link from "next/link";
import styles from "./../../styles/dashboard/SustainabilitySelection.module.css";

export default function RenderComponent({ details }) {
    return (
        <div>
            {
                details.componentType === 'input' && (
                    <div className={styles.formElement}>
                        <label className="font-semibold text-md">{details.label}</label><br />
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
        </div>
    );
}