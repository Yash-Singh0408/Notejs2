/**
 * Get /
 * Homepage
 */
exports.homepage = async(req,res)=>{
    const locals ={
        title:"NodesJs Notes",
        description:"NodeJs Note App"
    };
    res.render('index',{
        locals,
        layout:'../views/layouts/front-page'
    });
}

/**
 * Get /
 * Aboutpage
 */
exports.about = async(req,res)=>{
    const locals ={
        title:"About NodesJs Notes",
        description:"NodeJs Note App Description"
    };
    res.render('about',locals)
}

