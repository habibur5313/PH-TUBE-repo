const timeCount = (time) => {
                    const year = parseInt(time / 3.154e+7)
                    let remainingSecond = time % 3.154e+7
                    const day = parseInt(remainingSecond / 86400)
                    remainingSecond = remainingSecond % 86400;
                    const Hours = parseInt(remainingSecond / 3600);
                    remainingSecond = remainingSecond % 3600;
                    
                    const minute = parseInt(remainingSecond / 60)
                    remainingSecond = remainingSecond % 60;
                    return `
                            ${year} year ${day} day ${Hours} hours ${minute} minute ${remainingSecond} second
                    `
                    
            }

const categoryLoader = () => {
                    fetch ('https://openapi.programming-hero.com/api/phero-tube/categories')
                    .then(res => res.json())
                    .then(data => displayCategory(data.categories))
}

const videoLoader = () => {
                    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
                    .then(res => res.json())
                    .then(data => displayVideos(data.videos))
}

const loadCategoryVideo = (id) => {
          fetch (`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
          .then(res => res.json())
          .then(data => {

                const allBtn = document.getElementsByClassName('category-btn');
         for(let btn of allBtn){
              btn.classList.remove('bg-red-500','text-white')
               }
                  const activBtn = document.getElementById(`btn-${id}`)
                  activBtn.classList.add('bg-red-500', 'text-white')
                  
                  displayVideos(data.category)
          }
          )
}

const VideoDetails =(id)=> {
           fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
           .then(res => res.json())
           .then(data => displayVideoDetails(data.video)
           )
}



const displayCategory = (categories) =>{
      const dynamicBtn = document.getElementById('dynamic-btn')
      
      categories.forEach((data) => {
                          const btnContainer = document.createElement('div');
                         btnContainer.innerHTML= `
                         <button id= "btn-${data.category_id}" onclick= "loadCategoryVideo(${data.category_id})" class = "py-2 rounded-xl text-xl bg-gray-100 px-4 border category-btn">${data.category}</button>
                         `

                      dynamicBtn.appendChild(btnContainer)
                         })}

                    //      {
                    //                     "category_id": "1001",
                    //                     "video_id": "aaaa",
                    //                     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
                    //                     "title": "Shape of You",
                    //                     "authors": [
                    //                         {
                    //                             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
                    //                             "profile_name": "Olivia Mitchell",
                    //                             "verified": ""
                    //                         }
                    //                     ],
                    //                     "others": {
                    //                         "views": "100K",
                    //                         "posted_date": "16278"
                    //                     },
                    //                     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
                    //                 }          
   
const displayVideos = (videos) => {
                   const videoSection = document.getElementById("video-section")
                   videoSection.innerHTML = ""
                   if(videos.length === 0){
                        videoSection.classList.remove('grid')
                        videoSection.innerHTML = `
                         <div class = "flex flex-col h-[400px] justify-center items-center gap-4">
                         <img src ="Icon.png"/>
                         <h1 class= "text-2xl font-bold "> No Content Here IN This Category</h1>
                         </div>
                        `
                      
                        
                   }
                    videos.forEach(item => {
                        videoSection.classList.add('grid')
                                        const card = document.createElement('div');
                                        card.classList.add('card','card-compact')
                                        card.innerHTML = `
                                        <figure class= "h-[200px] relative">
                                       <img class="w-full h-full object-cover"
                                        src=${item.thumbnail}/>
                                        ${item.others.posted_date?.length !== 0 ?  `<span class= "absolute bg-black px-2 rounded text-white right-2 bottom-2">
                                                            ${timeCount(item.others.posted_date)}</span>` : '' }
                                       
                                        </figure>
                                        <div class="px-0 py-2 flex">
                                        <div>
                                         <img class="w-10 h-10 rounded-full object-cover"
                                        src=${item.authors[0].profile_picture}/>
                                        </div>
                                        <div>
                                        <h2 class= "font-bold text-2xl ">${item.title}</h2>
                                        <div class="flex items-center gap-1">
                                              <p class="font-semibold text-xl text-gray-400">${item.authors[0].profile_name}<p/> 
                                               <p>${item.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>': ''}</p>
                                        </div>
                                        <p>${item.others.views}</p>
                                        <button onclick="VideoDetails('${item.video_id}')" class="py-2 rounded-xl text-xl text-white px-4 border bg-blue-500"> details</button> 
                                        </div>
                                       
                                        </div>
                                        `
                         videoSection.appendChild(card)
                                        
                    })
                    
}

const displayVideoDetails = (datas) => {
 
       const modalContainer = document.getElementById("dynamic-modal-div")
       modalContainer.innerHTML = `
                                <img class= "w-full" src = ${datas.thumbnail}/> 
                                <p>${datas.description}</p>
       `


        // document.getElementById('showModalData').click()
        document.getElementById('my_modal_5').showModal()
        
}
   


categoryLoader()
videoLoader()