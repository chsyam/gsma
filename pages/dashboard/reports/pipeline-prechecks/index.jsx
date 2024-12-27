import { decrypt } from "./../../../api/auth/lib";
import styles from "./PipelinePrechecks.module.css";

export default function PipelinePrechecks() {
    return (
        <div className={styles.prechecksBodyContainer}>
            <div className={styles.prechecksContainer}>
                <h1>Jenkins Environment Pre-Checks Playbook</h1>
                <h2>1. Overview</h2>
                <p>
                    This Ansible playbook performs a series of pre-checks for a Jenkins environment. It verifies the installation and configuration of various tools and services necessary for a Jenkins CI/CD pipeline.
                </p>

                <h2>2. Prerequisites</h2>
                <p>Before running this playbook, ensure you have:</p>
                <ul>
                    <li>Ansible installed on the control node</li>
                    <li>Access to the Jenkins server</li>
                    <li>Necessary credentials for Jenkins and other services</li>
                </ul>

                <h2>3. Playbook Structure</h2>
                <p>The playbook is structured as follows:</p>
                <pre>
                    <code> {`
                    ---
                    - name: Pre-Checks for Jenkins Environment
                    hosts: localhost
                    gather_facts: no

                    vars:
                    jenkins_ip: "10.63.20.41"
                    jenkins_port: 8080
                    git_command: "git --version"
                    maven_command: "mvn --version"
                    kubectl_command: "kubectl version --client"
                    sonar_url: "http://10.138.77.104:9000"
                    docker_registry_url: "https://hub.docker.com/u/bhavanaguda"
                    jenkins_user: "ramakanth"
                    jenkins_token: "11224b5d9b915e9b6540e5fd11d87baf82"
                    jenkins_url: "http://10.63.20.41:8080"

                    tasks:
                    - name: Check if Git is installed
                    command: "{{ git_command }}"
                    register: git_result
                    ignore_errors: yes

                    - name: git
                    debug:
                    msg: "Git is installed."
                    when: git_result is succeeded

                    - name: Fail if Git is not installed
                    set_fact:
                    critical_failure: true
                    when: git_result is failed

                    - name: Check Available Memory on Jenkins Server
                    shell: free -m | awk NR==2{print $3}   # Get used memory
                    register: used_memory
                    ignore_errors: yes

                    - name: Check Total Memory on Jenkins Server
                    shell: free -m | awk NR==2{print $2}  # Get total memory
                    register: total_memory
                    ignore_errors: yes

                    - name: Insufficient Memory Check
                    debug:
                    msg: "Insufficient memory available on Jenkins server. Please allocate more memory."
                    when: used_memory.stdout|int == total_memory.stdout|int
                    ignore_errors: yes

                    - name: Memory Available
                    debug:
                    msg: "Memory available on Jenkins server: {{ total_memory.stdout | int - used_memory.stdout | int }} MB left."
                    when: used_memory.stdout|int != total_memory.stdout|int

                    - name: Check if Maven is installed
                    command: "{{ maven_command }}"
                    register: maven_result
                    ignore_errors: yes

                    - name: maven
                    debug:
                    msg: "Maven is installed."
                    when: maven_result is succeeded

                    - name: Fail if Maven is not installed
                    set_fact:
                    critical_failure: true
                    when: maven_result is failed

                    - name: Check if Kubernetes is installed
                    command: "{{ kubectl_command }}"
                    register: kubectl_result
                    ignore_errors: yes

                    - name: Kubernetes
                    debug:
                    msg: "Kubernetes is installed."
                    when: kubectl_result is succeeded

                    - name: Fail if Kubernetes is not installed
                    set_fact:
                    critical_failure: true
                    when: kubectl_result is failed

                    - name: Check Jenkins Master-Slave connection
                    uri:
                    url: "http://{{ jenkins_ip }}:{{ jenkins_port }}/computer/api/json"
                    method: GET
                    user: "{{ jenkins_user }}"
                    password: "{{ jenkins_token }}"
                    force_basic_auth: yes
                    return_content: yes
                    status_code: 200
                    register: jenkins_connection
                    ignore_errors: yes

                    - name: Connection status
                    debug:
                    msg: "Connection to Jenkins master-slave endpoint succeeded."
                    when: jenkins_connection.status == 200

                    - name: Fail if Jenkins master-slave connection failed
                    set_fact:
                    critical_failure: true
                    when: jenkins_connection.status != 200

                    - name: Check if Docker Registry is reachable
                    uri:
                    url: "{{ docker_registry_url }}"
                    return_content: yes
                    status_code: 200
                    register: docker_result
                    ignore_errors: yes

                    - name: Docker Registry
                    debug:
                    msg: "Docker Registry is reachable."
                    when: docker_result.status == 200

                    - name: Fail if Docker Registry is not reachable
                    set_fact:
                    critical_failure: true
                    when: docker_result.status != 200

                    - name: Get Jenkins nodes (build agents) status
                    uri:
                    url: "{{ jenkins_url }}/computer/api/json"
                    method: GET
                    user: "{{ jenkins_user }}"
                    password: "{{ jenkins_token }}"
                    force_basic_auth: yes
                    validate_certs: no
                    return_content: yes
                    register: jenkins_nodes_response
                    ignore_errors: yes

                    - name: Check if Jenkins nodes (build agents) are online
                    set_fact:
                    online_agents: "{{ jenkins_nodes_response.json.computer | selectattr('offline', 'equalto', False) | map(attribute = 'displayName') | list }}"
                    offline_agents: "{'{ jenkins_nodes_response.json.computer | selectattr('offline', 'equalto', True) | map(attribute = 'displayName') | list }}"

                    - name: Print online build agents
                    debug:
                    msg: "Online build agents: {{ online_agents }}"

                    - name: Print offline build agents
                    debug:
                    msg: "Offline build agents: {{ offline_agents }}"

                    - name: Final check and stop playbook if critical failure
                    block:
                    - name: Fail playbook if critical issues found
                    fail:
                    msg: "Critical issues found. Halting playbook execution."
                    when: critical_failure | default(false)

                    - name: Success message if no critical issues found
                    debug:
                    msg: "All pre-checks passed. Continuing with next stage."

                    when: critical_failure | default(false)
                    `}
                    </code>
                </pre>

                <h2>4. Variables</h2>
                <p>The playbook uses several variables for configuration:</p>
                <ul>
                    <li>jenkins_ip: IP address of the Jenkins server</li>
                    <li>jenkins_port: Port number for Jenkins</li>
                    <li>git_command, maven_command, kubectl_command: Commands to check tool installations</li>
                    <li>sonar_url, docker_registry_url: URLs for SonarQube and Docker registry</li>
                    <li>jenkins_user, jenkins_token: Credentials for Jenkins API access</li>
                </ul>

                <h2>5. Tasks</h2>
                <p>The playbook performs the following checks:</p>
                <ul>
                    <li>Git installation</li>
                    <li>Available memory on Jenkins server</li>
                    <li>Maven installation</li>
                    <li>Kubernetes installation</li>
                    <li>Jenkins Master-Slave connection</li>
                    <li>Docker Registry reachability</li>
                    <li>Jenkins nodes (build agents) status</li>
                </ul>

                <h2>6. Error Handling</h2>
                <p>The playbook uses a 'critical_failure' flag to track critical issues. If any critical check fails, the playbook will halt execution and display an error message.</p>

                <h2>7. Execution</h2>
                <p>To run the playbook, use the following command:</p>
                <pre>
                    <code>
                        {`ansible-playbook jenkins_prechecks.yml`}
                    </code>
                </pre>

                <h2>8. Output</h2>
                <p>The playbook will output the status of each check. If all checks pass, it will display a success message. If any critical issues are found, it will halt execution and display an error message.</p>
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