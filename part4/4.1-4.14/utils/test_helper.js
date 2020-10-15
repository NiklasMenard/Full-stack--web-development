const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const total = blogs.map(blogs => blogs.likes).reduce((prev, next) => prev + next)
    return total
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(({ likes }) => likes))
    const favoriteBlog = blogs.find(({ likes }) => likes === mostLikes)
    return favoriteBlog
}

const mostBlogsAuthor = (blogs) => {

    const mostBlogsAuthor = [...blogs.sort((a,b) =>
          blogs.filter(v => v===a).length
        - blogs.filter(v => v===b).length
    )].pop()
    const amountOfblogs = blogs.filter(blog => blog.author === mostBlogsAuthor.author)
    return {author: mostBlogsAuthor.author, amount: amountOfblogs.length}
}


const mostLikesAuthor = (blogs) => {
    let result = blogs.reduce((acc, obj)=>{
        let existingBlog = acc.find(blog => blog.author === obj.author);
        if(existingBlog){
            existingBlog.likes += obj.likes;
          return acc;
        } 
        acc.push(obj);
        return acc;
      }, []);
      return favoriteBlog(result)
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogsAuthor,
    mostLikesAuthor,
}