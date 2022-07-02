import React, {useState} from 'react';
export default function Header() {

	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);

	const uploadImage = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file',files[0])
		setLoading(true)
		
		fetch("http://localhost:5000/upload", {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				},
			body: data 
		})
		
		.then(res => res.json())
		.then(data => {
			setImage(data.result);
			setLoading(false);
		})
		.catch(err=>{
			setImage("Error hai bhai");
			setLoading(false);
			console.log(err);
		})		
	}


	function refreshPage() {
		window.location.reload(false);
	}

	return (
    	<div>
        	<section class="ui-section-hero">
        	<div class="ui-layout-container">
          		<div class="ui-section-hero__layout ui-layout-grid ui-layout-grid-2">
            		<div>
            		<h1>Waste Segregation</h1>
              		<p class="ui-text-intro">We know that your life is of no value but the life of our planet does! So, help us segregate waste according to the category.</p>
              
              		<div class="ui-component-cta ui-layout-flex">
           
						<input type="file" id="InputFile" name = "file"
							onChange={uploadImage} />

                  		<button onClick={refreshPage} className="display-button">Reset</button>
              		</div>
            	</div>
            
            	<img src="https://cdn.dribbble.com/users/1068771/screenshots/8801476/media/517d9a1e6d85d294d5daa0a870633994.jpg" alt="waste" />
        	</div>
			<div>
				{
					loading ? (
						<img className="loading-gif" src="https://cdn.dribbble.com/users/227188/screenshots/6792663/recycle.gif" alt="loading-gif" />
					) : (

						<div className="waste-type-div">
							<h2 class='waste-heading'>{image}</h2>
						</div>	
					)
				}
			</div>
        </div>
    	</section> 
    </div>
  );
}
