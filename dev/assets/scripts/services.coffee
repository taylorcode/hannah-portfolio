angular.module('hannah')

.filter 'camelCaseToDash', () ->
	(value) ->
		value.replace(' ', '-').toLowerCase()
# .factory 'jgApi', ($resource) ->
#   resumes: $resource 'api/account/resumes/', id: '@_id'
#   job: $resource 'api/jobs/:_id', _id: '@_id'
#   jobBookmarks: $resource '/api/account/jobs/bookmarks/:_id', _id: '@_id'
#   jobApplied: $resource '/api/account/jobs/applied/:_id', _id: '@_id'
#   jobs: $resource 'api/jobs/search/:search', search: '@search'
#   user: $resource 'api/user/:id', search: '@_id'
#   company: $resource 'api/company/:id', search: '@_id'
#   account: $resource 'api/account'
#   login: $resource 'api/login'

