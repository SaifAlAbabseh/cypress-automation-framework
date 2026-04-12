import groovy.json.JsonSlurper

pipeline {
    agent any

    environment {
        SLACK_CHANNEL = '#automation-jobs'
        SLACK_CHANNEL_ID = 'C05R1CXD2Q4'
    }
    
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        
        stage('Checkout GitHub Repo') {
            steps {
                git branch: 'main',
                    credentialsId: 'cypress-automation-framework',
                    url: 'https://github.com/SaifAlAbabseh/cypress-automation-framework.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Verify Cypress') {
            steps {
                sh 'npx cypress verify'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npx cypress run --browser ${browser} --env device=${displayView}'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/html/**', allowEmptyArchive: true
            
            script {
                
                def reportPath = "cypress/reports/html/index.json"
                    
                if (fileExists(reportPath)) {
                    def report = readJSON file: reportPath
                    def stats = report.stats
                    
                    def TOTAL_TESTS = stats.tests
                    def PASSED_TESTS = stats.passes
                    def FAILED_TESTS = stats.failures
                    def SKIPPED_TESTS = stats.skipped
                    def PENDING_TESTS = stats.pending
                    def durationSec = (stats.duration / 1000).setScale(2, BigDecimal.ROUND_HALF_UP)
                    def isSuccess = (currentBuild.result == null || currentBuild.result == 'SUCCESS')
                    def jobStatusOverall = isSuccess ? '✅  PASSED JOB ✅' : '❌ FAILED JOB ❌'
                    def platformTestedOn = params.displayView.toUpperCase()
                    def browserTestedOn = params.browser.toUpperCase()
                    def reportLink = "${env.BUILD_URL}artifact/cypress/reports/html/index.html"
                    def slackMessage = """
    ************************************************************
                            ${jobStatusOverall}
    ************************************************************
    * 💼 Job: ${env.JOB_NAME}
    * 🔨 Build #: ${env.BUILD_NUMBER}
    * 🔨 Build Link: <${env.BUILD_URL}|Click here>
    ************************************************************
                            📊 Total Tests = ${TOTAL_TESTS}
                            ⏲️ Test Duration(in Seconds) = ${durationSec}
    ************************************************************
    * ✅ PASSED: ${PASSED_TESTS}
    * ❌ FAILED: ${FAILED_TESTS}
    * ⏩ SKIPPED: ${SKIPPED_TESTS}
    * ⏩ PENDING: ${PENDING_TESTS}
    ************************************************************
    * 🌐 Browser: ${browserTestedOn}
    * ⚙️ Platform: ${platformTestedOn}
    * 📒 Report: <${reportLink}|HTML Report>
    """
                    
                    def resultColor = isSuccess ? "good" : "danger"
                    // Send Slack message
                    slackSend(
                        channel:"${env.SLACK_CHANNEL}",
                        color: resultColor,
                        message: slackMessage
                    )
                }
                
            }
        }
    }
}