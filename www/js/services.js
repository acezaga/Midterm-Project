angular.module('starter.services', [])

.factory('accountService', function($http) {
  var acctObject = {};

    acctObject.createAccount = function(account){
        return $http.post('http://127.0.0.1:3000/user/register', account);
    }

    acctObject.authenticateAccount = function(account){
        return $http.post('http://127.0.0.1:3000/user/ioniclogin', account);
    }

    acctObject.getNotification = function(id){
        return $http.get('http://127.0.0.1:3000/user/notifications/'+id);
    }

    acctObject.checkIfRequested = function(data){
        return $http.post('http://127.0.0.1:3000/user/connReqCheck', data);
    }

    acctObject.saveChanges = function(account){
        return $http.put('http://127.0.0.1:3000/user/saveChanges/', {account: account});
    }

    acctObject.getConnectionInfo = function(connection){
        return $http.post('http://127.0.0.1:3000/user/connectionInfo', {connections: connection});
    }

    acctObject.getInvitedCollaborators = function(data){
        return $http.post('http://127.0.0.1:3000/user/invitedCollabCheck', data);
    }

    acctObject.getOrganizationProfile = function(data){
        return $http.get('http://127.0.0.1:3000/user/orgprofile/'+data);
    }

    acctObject.getSuggestedAccounts = function(data){
        return $http.post('http://127.0.0.1:3000/user/suggestedAccounts',{account: data});
    }

    acctObject.getSuggestedAccountsToProject = function(data){
        return $http.post('http://127.0.0.1:3000/user/suggestedAccountsToProject', {project: data});
    }

    acctObject.getDonorDescription = function(data){
        return $http.get('http://127.0.0.1:3000/user/getDonorDescription/'+data);
    }

    acctObject.getSearchUser = function(data){
        return $http.get('http://127.0.0.1:3000/user/searchUser/'+data);
    }

    acctObject.getAccountById = function(data){
        return $http.get('http://127.0.0.1:3000/user/getAccountById/'+data);
    }

    acctObject.changeAccountSettings = function(data){
        return $http.post('http://127.0.0.1:3000/user/changeAccountSettings', {account: data});
    }

    acctObject.getSenderPicture = function(data){
        return $http.get('http://127.0.0.1:3000/user/senderPicture/'+data);
    }

    acctObject.checkIfPending = function(data){
        return $http.post('http://127.0.0.1:3000/user/connPendingCheck', data);
    }

    acctObject.getListOfFAQs = function(){
        return $http.get('http://127.0.0.1:3000/user/listOfFAQs');
    }

    acctObject.sendFAQ = function(data){
        return $http.post('http://127.0.0.1:3000/user/sendFAQ', {faq: data});
    }

    acctObject.logout = function(account){

    }

    return acctObject;
})

.factory('projectService', function($http) {
    var projectObject = {};

    projectObject.createProject = function(projectInfo){
        return $http.post('http://127.0.0.1:3000/project/create', projectInfo);
    }

    projectObject.getAllProjects = function(){
        return $http({
            url: 'http://127.0.0.1:3000/project/allProjects',
            method: 'GET'
        });
    }

    projectObject.getUserProjects = function(userId){
        return $http.get('http://127.0.0.1:3000/project/allUserProjects/'+userId);
    }

    projectObject.getProject = function(projectTitle){
        return $http.get('http://127.0.0.1:3000/project/specificProject/'+projectTitle);
    }

    projectObject.getCreator = function(id){
        return $http.get('http://127.0.0.1:3000/user/creator/'+id);
    }

    projectObject.saveChanges = function(project){
        return $http.put('http://127.0.0.1:3000/project/update', {project: project});
    }

    projectObject.checkIfCollabRequested = function(data){
        return $http.post('http://127.0.0.1:3000/project/collabReqCheck', data);
    }

    projectObject.checkIfSingleCollabRequested = function(data){
        return $http.post('http://127.0.0.1:3000/project/singleCollabReqCheck', data);
    }

    projectObject.checkIfCollaborated = function(data){

    }

    projectObject.getSuggestedProjects = function(data){
        return $http.post('http://127.0.0.1:3000/project/suggestedProjects', {account: data});
    }

    projectObject.getSuggestedProjectsByCriteria = function(data){
        return $http.post('http://127.0.0.1:3000/project/suggestedProjectsByCriteria', data);
    }

    projectObject.getProjectSummary = function(data){
        return $http.get('http://127.0.0.1:3000/project/projectSummary/'+data);
    }

    projectObject.saveSummaryReport = function(data){
        return $http.post('http://127.0.0.1:3000/project/saveProjectSummary', {summary: data});
    }

    projectObject.getProjectDonors = function(data){
        return $http.get('http://127.0.0.1:3000/project/donors/'+data);
    }

    projectObject.getCollaboratedProjects = function(data){
        return $http.get('http://127.0.0.1:3000/project/collaboratedProjects/'+data);
    }

    projectObject.submitPerformanceReport = function(data){
        return $http.post('http://127.0.0.1:3000/project/savePerformanceReport', {report: data});
    }

    projectObject.getCollaboratorInfo = function(data){
        return $http.post('http://127.0.0.1:3000/project/getCollaboratorInfo', {collaborators: data});
    }

    projectObject.getOngoingProjects = function(data){
        return $http.get('http://127.0.0.1:3000/project/ongoingProjects/'+data);
    }

    projectObject.getPortfolio = function(data){
        return $http.get('http://127.0.0.1:3000/project/portfolio/'+data);
    }

    projectObject.getAllProjectSummary = function(data){
        return $http.get('http://127.0.0.1:3000/project/allProjectSummary/'+data);
    }

    projectObject.getAllProjectSummaryByYear = function(id, year){
        return $http.post('http://127.0.0.1:3000/project/allProjectSummaryByYear', {account: id, year: year});
    }

    projectObject.getProjectByIdSummary = function(data){
        return $http.get('http://127.0.0.1:3000/project/projectByIdforSummary/'+data);
    }

    projectObject.getAllPerformanceStat = function(id, year){
        return $http.post('http://127.0.0.1:3000/project/allPerformanceStat/', {account: id, year: year});
    }

    projectObject.getStatOfProject = function(id, year, choice){
        return $http.post('http://127.0.0.1:3000/project/statisticalProjectReport', {account: id, year: year, choice: choice});
    }

    projectObject.getProjectByYear = function(id, year){
        return $http.post('http://127.0.0.1:3000/project/projectsByYear', {account: id, year: year});
    }

    projectObject.getResourceStatistics = function(projectId){
        return $http.get('http://127.0.0.1:3000/project/resourceStatistics/'+projectId);
    }

    projectObject.getSearchProject = function(data){
        return $http.get('http://127.0.0.1:3000/project/searchProject/'+data);
    }

    projectObject.getProjectById = function(data){
        return $http.get('http://127.0.0.1:3000/project/getProjectById/'+data);
    }

    projectObject.getSectorByYear = function(year, account){
        return $http.post('http://127.0.0.1:3000/project/getSectorsByYear', {year: year, account: account});
    }

    projectObject.getAllProjectCollaboration = function(data){
        return $http.get('http://127.0.0.1:3000/project/getCollaboratedProjects/'+data);
    }

    projectObject.getAllInitiatedProjects = function(data){
        return $http.get('http://127.0.0.1:3000/project/allOwnedProjects/'+data);
    }

    return projectObject;
  
});
