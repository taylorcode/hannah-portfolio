titleCaseToDash = (str) ->
  str.replace(/\s+/g, '-').toLowerCase()

module.exports = (grunt) ->

  grunt.registerMultiTask "copySubdirs", "Creates project JSON file.", ->

    src = @data.src
    dest = @data.dest

    grunt.file.recurse src, (abspath, rootdir, subdir, filename) ->

      return if filename.charAt(0) is '.' # hidden files

      # make the file destination
      fileDest = titleCaseToDash(dest + '/' + subdir.split('/')[1])

      # make the directory if it doesn't exist
      grunt.file.mkdir fileDest if not grunt.file.exists fileDest

      # copy the file to the directory
      grunt.file.copy abspath, fileDest + '/' + titleCaseToDash filename