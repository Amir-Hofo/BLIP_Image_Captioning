function uploadImage() {
    var file = document.getElementById('input_image_id').files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        document.querySelector('.displayed_image_cls').src = e.target.result;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function generateCaption() {
    var file = document.getElementById('input_image_id').files[0];
    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    var formData = new FormData();
    formData.append('image', file);

    document.getElementById('loading_spinner').style.display = 'block';
    document.getElementById('output_caption_id').innerHTML = "";

    fetch('/generate_caption', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('output_caption_id').innerHTML = "Caption: " + data;
        document.getElementById('loading_spinner').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output_caption_id').innerHTML = "Error generating caption";
        document.getElementById('loading_spinner').style.display = 'none';
    });
}

document.getElementById('input_image_id')
    .addEventListener('change', uploadImage);

document.getElementById('generate_btn_id')
    .addEventListener('click', generateCaption);