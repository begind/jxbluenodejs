pipeline {
  agent {
    label "jenkins-nodejs"
  }
  environment {
    ORG = 'psldocker88'
    APP_NAME = 'jxbluenodejs'
    CHARTMUSEUM_CREDS = credentials('jenkins-x-chartmuseum')
    DOCKER_REGISTRY_ORG = 'psldocker88'
  }
  stages {
    stage('Lint Code') {
      steps {
        container('nodejs') {
          // some code modeled off of Jenkins X's quickstart angular app
          // ensure we're not on a detached head 
          sh "git checkout master"
          sh "git config --global credential.helper store"
          sh "jx step git credentials"

          // so we can retrieve the version in later steps
          sh "echo \$(jx-release-version) > VERSION"
          sh "jx step tag --version \$(cat VERSION)"
          sh "jx step credential -s npm-token -k file -f /builder/home/.npmrc --optional=true"

          // lint the code
          sh "npm install"
          //sh "npm install -g @angular/cli@8.3.22"
          sh "ng lint"
        }
      }
    }
    stage('Build and put in docker hub') {
      steps {
        container('nodejs') {

          //jx step post build builds and puts the container into the docker
          //hub that is configured in Jenkins X
          sh "export VERSION=`cat VERSION` && skaffold build -f skaffold.yaml"
          sh "jx step post build --image $DOCKER_REGISTRY/$ORG/$APP_NAME:\$(cat VERSION)"
        }
      }
    }
    stage('Deploy in stage/blue environment') {
      steps {
        container('nodejs') {
          dir('./charts/jxbluenodejs') {
            sh "jx step changelog --batch-mode --version v\$(cat ../../VERSION)"

            // release the helm chart
            sh "jx step helm release"

            // promote to stage/blue environment
            sh "jx promote -b -e staging --timeout 1h --version \$(cat ../../VERSION)"

          }
        }
      }
    }
    stage('Done testing?') {
      steps {

        input "Done testing, and ready to move to production?"

        }
      }
    stage('Deploy in production/green environment') {
      steps {
        container('nodejs') {
          dir('./charts/jxbluenodejs') {
            sh "jx step changelog --batch-mode --version v\$(cat ../../VERSION)"

            // release the helm chart
            sh "jx step helm release"

            // promote to production/green environment
            sh "jx promote -b -e production --timeout 1h --version \$(cat ../../VERSION)"
          }
        }
      }
    }
  }
  post {
        always {
          cleanWs()
        }
  }
}
