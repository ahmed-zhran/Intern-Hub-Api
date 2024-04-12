// def COLOR_MAP = [
//     'SUCCESS' : 'good',
//     'FAILURE' : 'danger',
// ]

pipeline{

    agent {label 'BACK'}



   stages{

    // Testing Ansible 
    // stage ('Ansible'){
    //     steps{

    //         sh 'ansible --version'
    //     }
    // }

//         // Create Or Update ENV File
//         //stage('Create Or Update .env File') {
//             // steps {
//             //     script {
//             //         if (!fileExists('.env')) {
//             //             withCredentials([file(credentialsId: 'ENV', variable: 'SECRET_FILE')]) {
//             //                 sh 'cp $SECRET_FILE .env'
//             //             }
//             //         } else {
//             //             withCredentials([file(credentialsId: 'ENV', variable: 'NEW_FILE')]) {
//             //                 def secretContent = readFile(env.NEW_FILE).trim()
//             //                 def envContent = readFile('.env').trim()
//             //                 if (secretContent != envContent) {
//             //                     writeFile file: '.env', text: secretContent, encoding: 'UTF-8'
//             //                     echo '.env file updated'
//             //                 } else {
//             //                     echo '.env file is up to date'
//             //                 }
//             //             }
//             //         }
//             //     }
//             // }
//         //}

        stage('Check Docker Resources') {
            steps {
                script {
                    def containerIds = sh(script: 'docker ps -a -q', returnStdout: true).trim().split('\n')

                    if (containerIds.size() > 0) {
                        containerIds.each { containerId ->
                            sh "docker stop ${containerId}"
                            sh "docker rm ${containerId}"
                        }
                    } else {
                        echo 'No Docker containers to stop or remove'
                    }

                    def imageIds = sh(script: 'docker images -q', returnStdout: true).trim().split('\n')

                    if (imageIds.size() > 0) {
                        imageIds.each { imageId ->
                            sh "docker rmi ${imageId}"
                        }
                    } else {
                        echo 'No Docker images to remove'
                    }
                }
            }
        }

        stage('Creating Docker Image') {
            steps{

                sh 'docker run -t backend .'
            }
        }


        stage('Creating Docker Container') {
            steps{
                sh 'docker build -d --name InternHub backend'
            }
        }

//     post {
//         success {
//             echo 'Slack Notifications .'
//             slackSend channel: 'internhub-backend',
//                 color: COLOR_MAP[currentBuild.currentResult],
//                 message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}"
//             // script {
//             //     currentBuild.rawBuild.delete() // Delete build history when successful
//             // } 
//         }

//         failure {
//             echo 'Slack Notifications .'
//             slackSend channel: 'internhub-backend',
//                 color: COLOR_MAP[currentBuild.currentResult],
//                 message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
//         }

//         aborted {
//             echo 'Slack Notifications .'
//             slackSend channel: 'internhub-backend',
//                 color: COLOR_MAP[currentBuild.currentResult],
//                 message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
//         }
    }
}