import styles from "./RegionBasedProvisioning.module.css"
import { decrypt } from "./../../../api/auth/lib";

export default function RegionBasedProvisioning() {
    return (
        <div className={styles.bodyContainer}>
            <div className={styles.container}>
                <h2>Region-Based Provisioning with OPA and Terraform</h2>

                <h3>1. Setting up OPA with Terraform</h3>
                <p>First, ensure you have OPA integrated with Terraform. OPA allows you to define and enforce policies across your infrastructure deployments.</p>

                <h3>2. Define the Policy</h3>
                <p>Create a policy file (e.g., <code>region_policy.rego</code>) with the following rules to enforce restrictions based on carbon emissions:</p>

                <pre>
                    <code>
                        {`package terraform

deny[msg] {
    input.variables.region.value == "ap-south-1"
    msg := {"Warning": "Deploying infrastructure in ap-south-1 region, which has higher carbon emissions of 751 gCO2eq/Kwh. Consider deploying resources in regions [ap-northeast-3, ap-northeast-2, ap-south-2] which have less CO2 Emission."}
}

deny[msg] {
    input.variables.region.value == "ap-southeast-3"
    msg := {"Warning": "Deploying infrastructure in ap-southeast-3 region, which has higher carbon emissions of 652 gCO2eq/Kwh. Consider deploying resources in regions [ap-northeast-3, ap-northeast-2, ap-south-2] which have less CO2 Emission."}
}

// ... (rest of the policy code)`}
                    </code>
                </pre>
                <h3>3. Explanation of the Policy</h3>
                <p>Each <code>deny</code> block specifies a condition (<code>input.variables.region.value == "&lt;region&gt;"</code>) and a corresponding message (<code>msg</code>) to warn about high carbon emissions.</p>
                <p>Regions like <code>ap-southeast-2</code> have a specific recommendation due to their higher emissions, suggesting alternative regions using renewable energy. Other regions are advised to switch to alternative regions with lower carbon emissions.</p>

                <h3>4. Integrating with Terraform</h3>
                <p>In your Terraform deployment scripts, use OPA to enforce this policy during provisioning. Ensure OPA is configured to evaluate this policy against your Terraform input variables (<code>input.variables.region.value</code>). Below is an example of how you might integrate OPA with Terraform:</p>

                <pre>
                    <code>
                        {`# Example Terraform configuration
provider "aws" {
    region = var.region
}

# Define variables including region
variable "region" {
    type = string
    default = "us-east-1"  # Example region
}

# OPA policy enforcement using external data source
data "external" "opa_check" {
    program = ["OPA", "eval", "-i", "-", "region_policy.rego"]

    query = {
        input = {
            variables = {
                region = {
                    value = var.region
                }
            }
        }
    }
}

# Conditional logic to check OPA output
locals {
    opa_warning = try(jsondecode(data.external.opa_check.result), { })
}

resource "null_resource" "example" {
    count = local.opa_warning.Warning != null ? 1 : 0

    provisioner "local-exec" {
        command = "echo ${'local.opa_warning.Warning'}"
    }
}`
                        }
                    </code>
                </pre>

                <h3>5. Testing and Deployment</h3>
                <ul>
                    <li>Test your Terraform scripts with different region inputs to ensure OPA correctly enforces the policy.</li>
                    <li>Deploy your infrastructure using Terraform, ensuring that deployments in restricted regions trigger warnings or are denied as per the OPA policy.</li>
                </ul>

                <p>By following these steps, you can effectively implement region-based provisioning using OPA with Terraform while enforcing environmental considerations based on carbon emissions across different cloud regions. Adjust the policy and integration specifics as per your organization's requirements and OPA setup.</p>
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