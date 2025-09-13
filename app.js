document.addEventListener('DOMContentLoaded', function () {
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const radio = option.querySelector('input[type="radio"]');
            radio.checked = true;

            
            const parentQuestion = option.closest('.question-card');
            parentQuestion.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });

           
            option.classList.add('selected');
        });
    });

    
    const checkButtons = document.querySelectorAll('.question-card .btn');
    checkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const questionCard = button.closest('.question-card');
            const selectedOption = questionCard.querySelector('.option.selected');

            if (!selectedOption) {
                alert('Please select an answer first!');
                return;
            }

            
            const isCorrect = Math.random() > 0.5;
            if (isCorrect) {
                alert('Correct! Well done!');
                selectedOption.style.background = '#e8f5e9';
            } else {
                alert('Incorrect. Try again!');
                selectedOption.style.background = '#ffebee';
            }
        });
    });

   
    const sessionButtons = document.querySelectorAll('.day-card .btn');
    sessionButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.textContent === 'Start Session') {
                this.textContent = 'Complete Session';
                this.style.background = '#4caf50';
            } else {
                this.textContent = 'Completed ✓';
                this.style.background = '#4caf50';
                this.disabled = true;
            }
        });
    });

    
    setTimeout(() => {
        document.querySelector('.progress-fill').style.width = '65%';
    }, 500);

    
    generateHeatmap();
});

function generateHeatmap() {
    const heatmap = document.getElementById('heatmap');
    heatmap.innerHTML = '';

    
    for (let i = 0; i < 365; i++) {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';

        
        const activityLevel = Math.floor(Math.random() * 5);

        
        switch (activityLevel) {
            case 0:
                cell.style.backgroundColor = '#ebedf0';
                break;
            case 1:
                cell.style.backgroundColor = '#c6e48b';
                break;
            case 2:
                cell.style.backgroundColor = '#7bc96f';
                break;
            case 3:
                cell.style.backgroundColor = '#239a3b';
                break;
            case 4:
                cell.style.backgroundColor = '#196127';
                break;
        }


        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let activityText = 'No activity';
        if (activityLevel === 1) activityText = '1-30 minutes of study';
        if (activityLevel === 2) activityText = '30-60 minutes of study';
        if (activityLevel === 3) activityText = '1-2 hours of study';
        if (activityLevel === 4) activityText = '2+ hours of study';

        cell.title = `${formattedDate}: ${activityText}`;

        heatmap.appendChild(cell);
    }
}
