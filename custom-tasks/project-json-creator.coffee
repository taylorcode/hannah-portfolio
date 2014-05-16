_ = require 'underscore'
exif = require 'exif2' # intense read of EXIF metadata -- exif abspath, (err, obj) ->
RSVP = require 'rsvp'
im = require 'imagemagick'

# convert the keyed object to JSON format we want
jsonKeyMap = (categories) ->
  _.map(categories, (obj, key) ->
    name: key
    projects: _.map(obj, (obj, key) ->
      title: key
      dir: key
      images: _.map(obj, (obj, key) ->
        img = src: key
        img.description = obj if obj
        img
      )
    )
  )

# createKeyMap = (abspath, categories, category, project, filename) ->

#   return new RSVP.Promise (resolve, reject) ->

#     # extract meta data
#     im.readMetadata abspath, (err, metadata) ->
#       if categories[category]
#         c = categories[category]
#         c[project] = {} unless c[project]
#         p = c[project]

#       else
#         c = categories[category] = {}
#         p = c[project] = {}

#       if metadata.exif
#         p[filename] = metadata.exif.imageDescription or null
      
#       resolve()


module.exports = (grunt) ->

  grunt.registerMultiTask "projectJSON", "Creates project JSON file.", ->

    done = @async()
    src = @data.src
    dest = @data.dest
    categories = {}
    exifPromises = []

    grunt.file.recurse src, (abspath, rootdir, subdir, filename) ->

      return unless subdir
      return if filename.charAt(0) is '.'
      
      subDirParts = subdir.split '/'

      category = subDirParts[0]
      project = subDirParts[1]


      if categories[category]
        c = categories[category]
        c[project] = {} unless c[project]
        p = c[project]

      else
        c = categories[category] = {}
        p = c[project] = {}

      p[filename] = ' '

      # if metadata.exif
      #   p[filename] = metadata.exif.imageDescription or null

      grunt.file.write dest, JSON.stringify jsonKeyMap categories

      # exifPromises.push createKeyMap abspath, categories, category, project, filename

    # RSVP.all(exifPromises).then ->
    #   console.log arguments
    #   grunt.file.write dest, JSON.stringify jsonKeyMap categories
    #   done()

    return

