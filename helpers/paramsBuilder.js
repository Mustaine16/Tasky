function paramsBuilder(bodyParams,validParams){
  //BodyParams --> req.body
  //ValidParams --> Array of strings that indicates the valid params wich will be updated

    const params = {}
    
    validParams.forEach(param => {
      if(bodyParams.hasOwnProperty(param))
        params[param] = bodyParams[param]
    });

    return params 

    /*
    return {
      name: "demo",
      password:"123"
    }
    */

} 

export {paramsBuilder}