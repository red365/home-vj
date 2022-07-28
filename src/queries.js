const queries = {
  getAllSlideshows: () => {
    return `    
      select * from slideshows
    `;
  },
  getAllSlideshowsWithImageCount: () => {
    return `
      select a.id, a.name, count(b.slideshowId) 
      from slideshows as a 
      left join slideshowImages as b 
      on a.id = b.slideshowId 
      group by a.id;
    `;
  },
  getProjectSlideshows: () => {
    return `
      select *
      from projectSlideshows as a
      inner join slideshows as b
      on a.slideshowId = b.Id
      where projectId = ?
    `;
  },
  getProjectSlideshow: () => {
    return `
      select *
      from projectSlideshows
      where projectId = ? and slideshowId = ?
    `;
  },
  getSlideshowImages: () => {
    return `
      select *
      from slideshowImages as a
      inner join images as b                                                       
      on a.imageId = b.id                                                      
      where slideshowId = ?
    `;
  },
  getAllSlideshowsWithImages: () => {
    return `
      select a.id as slideshowId, a.name, b.imageId as imageId, b.positionInSlideshow, c.description, c.filename
      from slideshows as a
      inner join slideshowImages as b                                                       
      on a.id = b.slideshowId
      inner join images as c
      on b.imageId = c.Id
      ORDER BY a.id, positionInSlideshow
      `;
  },
  getStorySlideshowImages: () => {
    return `
      select a.storyId, a.slideshowId, b.imageId, b.positionInSlideshow, c.description, c.filename
      from storySlideshows as a
      inner join slideshowImages as b                                                       
      on a.slideshowId = b.slideshowId
      inner join images as c
      on b.imageId = c.Id
      where storyId = ?
    `;
  },
  getAllImages: () => {
    return `select *
      from images`;
  },
  getProjectLocalVideos: () => {
    return `
      select *
      from projectLocalVideos as a
      inner join localVideos as b
      on a.localVideoId = b.Id
      where projectId = ?
    `;
  },
  getProjectLocalVideo: () => {
    return `
    select *
    from projectLocalVideos as a
    inner join localVideos as b
    on a.localVideoId = b.Id
    where projectId = ? and localVideoId = ?
  `;
  },
  getProjectStories: () => {
    return `
      select b.id, b.name
      from projectStories as a
      inner join stories as b
      on a.storyId = b.id
      where projectId = ?
    `;
  },
  getStory: () => {
    return `
      select *
      from stories
      where Id = ?
    `;
  },
  getStorySlideshows: () => {
    return `
      select *
      from storySlideshows
      where storyId = ?
    `;
  },
  getStorySlideshowsAndImages: () => {
    return `
      select *
      from storySlideshows as a
      inner join slideshowImages as b
      on a.slideshowId = b.slideshowId
      where storyId = ?
    `;
  },
  getStoryLocalVideos: () => {
    return `
      select *
      from storyLocalVideos as a
      JOIN localVideos as b 
      on a.localVideoId = b.id
      where a.storyId = ?
    `;
  },
  getAllLocalVideos: () => {
    return `
      select *
      from localVideos
    `;
  },
  getVideo: () => {
    return `
      select *
      from localVideos
      where id = ?
    `;
  },
  getAllStories: () => {
    return `
      select *
      from stories
      where projectId = ?
    `;
  },
  getAllProjects: () => {
    return `
      select *
      from projects
    `;
  },
  insertProject: () => {
    return `
      insert into projects set name = ?
    `;
  },
  insertSlideshow: () => {
    return `
      insert into slideshows set name = ?
    `;
  },
  insertImage: () => {
    return `
      insert into images set description = ?, filename = ?
    `;
  },
  insertSlideShowImage: () => {
    return `
      insert into slideshowImages set slideshowId = ?, imageId = ?, positionInSlideshow = ?
    `;
  },
  insertLocalVideos: () => {
    return `
      insert into localVideos set description = ?, filename = ?, videoDuration = ?
    `;
  },
  insertProjectSlideshow: () => {
    return `
      insert into projectSlideshows set projectId = ?, slideshowId = ?, random = ?`;
  },
  insertProjectLocalVideo: () => {
    return `
      insert into projectLocalVideos set projectId = ?, localVideoId = ?, startAtPosition = ?`;
  },
  insertStory: () => {
    return `
      insert into stories set storyType = ?, name = ?, alternateMediaType = ?, random = ?
  `;
  },
  insertProjectStory: () => {
    return `
      insert into projectStories set projectId = ?, storyId = ?
    `;
  },
  insertStorySlideshow: () => {
    return `insert into storySlideshows set storyId = ?, slideshowId = ?, random = ?, playEntireSlideshow = ?, duration = ?, slideDuration = ?, mediaIndex = ?`;
  },
  insertStoryLocalVideo: () => {
    return `insert into storyLocalVideos set storyId = ?, localVideoId = ?, duration = ?, startAtPosition = ?, playbackSpeed = ?, playEntireVideo = ?, mediaIndex = ?, bookmarkVideo = ?`;
  },
};

export default queries;
