function uploadImage(){
    var file = document.getElementById('input_image_id').files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        document.querySelector('.displayed_image_cls').src = e.target.result;
    };
    if (file) {
        reader.readAsDataURL(file);}
}

function generateCaption(){
    var file = document.getElementById('input_image_id').files[0];
    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    fetch('/generate_caption', {
        method: 'POST'
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('output_caption_id').innerHTML = "Caption: " + data;
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('input_image_id')
    .addEventListener('change', uploadImage);

document.getElementById('generate_btn_id')
    .addEventListener('click', generateCaption);