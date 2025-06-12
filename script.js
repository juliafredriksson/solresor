document.addEventListener('DOMContentLoaded', () => {
    const phaseDisplay = document.getElementById('phase-display');
    const phaseDescription = document.getElementById('phase-description');
    const recommendationList = document.getElementById('recommendation-list');
    const currentDayDisplay = document.getElementById('current-day-display');
    const outerCircle = document.querySelector('.outer-circle');
    const innerCircle = document.querySelector('.inner-circle');
    const dragHandle = document.getElementById('dragHandle');

    const CYCLE_LENGTH = 28;
    let isDragging = false;
    let currentDay = 1;

    function getPhaseAndRecommendations(dayInCycle) {
        let phaseName = "";
        let phaseDesc = "";
        let recommendations = [];

        if (dayInCycle >= 1 && dayInCycle <= 5) {
            phaseName = "Mensfasen";
            phaseDesc = "Kroppen fokuserar på återhämtning och rensning. Lyssna på kroppen och var snäll mot dig själv.";
            recommendations = [
                {
                    title: "Lugn promenad",
                    description: "Lågenergiaktivitet för att minska smärta och kramp.",
                    link: "https://www.youtube.com/watch?v=3Ka7B3hCg08"
                },
                {
                    title: "Mjuk yoga / Stretching",
                    description: "Främjar avslappning och rörlighet, kan lindra obehag.",
                    link: "https://www.youtube.com/watch?v=VaoV1PrYft4"
                },
                {
                    title: "Lätt styrketräning",
                    description: "Med fokus på teknik och lägre vikter, lyssna på kroppen.",
                    link: "https://www.youtube.com/watch?v=U0bhE67HuDY"
                }
            ];
        } else if (dayInCycle >= 6 && dayInCycle <= 13) {
            phaseName = "Follikulär fas";
            phaseDesc = "Energin stiger! Kroppen förbereder sig för ägglossning, vilket ger dig mer ork och styrka.";
            recommendations = [
                {
                    title: "HIIT-träning",
                    description: "Passar bra då energin ofta är högre och testosteronnivåerna stiger.",
                    link: "https://www.youtube.com/watch?v=ml6cT4AZdqI"
                },
                {
                    title: "Styrketräning med tunga vikter",
                    description: "Kroppen är ofta mer mottaglig för styrkeökningar och återhämtar sig snabbare.",
                    link: "https://www.youtube.com/watch?v=U0bhE67HuDY"
                },
                {
                    title: "Löpning/Kondition",
                    description: "Långa pass eller tempolöpning för att bygga uthållighet.",
                    link: "https://www.youtube.com/watch?v=wCVSv7UxB2E"
                }
            ];
        } else if (dayInCycle >= 14 && dayInCycle <= 17) {
            phaseName = "Ägglossningsfasen";
            phaseDesc = "Toppen av din styrka och energi! Passa på att utmana dig själv med kraftfull träning.";
            recommendations = [
                {
                    title: "Explosiv träning",
                    description: "Hopp, sprints, plyometrik – dra nytta av toppen av din styrka och energi.",
                    link: "https://www.youtube.com/watch?v=1b98WrRrmUs"
                },
                {
                    title: "Dans / Koordinationsträning",
                    description: "Kroppen kan kännas extra stark och koordinerad, perfekt för komplexa rörelser.",
                    link: "https://www.youtube.com/watch?v=ZWk19OVon2k"
                },
                {
                    title: "Cross-training",
                    description: "Varierad träning som utmanar hela kroppen.",
                    link: "https://www.youtube.com/watch?v=mzqH0I4FAs0"
                }
            ];
        } else if (dayInCycle >= 18 && dayInCycle <= CYCLE_LENGTH) {
            phaseName = "Lutealfasen";
            phaseDesc = "Energin kan börja dala. Fokusera på att bibehålla styrka och minska stress, särskilt inför PMS.";
            recommendations = [
                {
                    title: "Medeltung styrketräning",
                    description: "Bibehåll styrka med lite lägre intensitet för att undvika överansträngning.",
                    link: "https://www.youtube.com/watch?v=2tM1LFFxeKg"
                },
                {
                    title: "Simning / Cykling",
                    description: "Skonsamma konditionsformer som belastar lederna mindre.",
                    link: "https://www.youtube.com/watch?v=VHYKs7aV4xE"
                },
                {
                    title: "Promenader / Vandring",
                    description: "Fokusera på att minska stress och öka välbefinnandet.",
                    link: "https://www.youtube.com/watch?v=HeSt9D2dqO4"
                }
            ];
        } else {
            phaseName = "Välj en dag i din cykel";
            phaseDesc = "Dra i handtaget runt cirkeln för att se rekommendationer.";
            recommendations = [{
                title: "Dra i handtaget",
                description: "Flytta handtaget runt cirkeln för att se träningsrekommendationer.",
                link: "#"
            }];
        }

        return { phaseName, phaseDesc, recommendations };
    }

    function renderRecommendations(recs) {
        recommendationList.innerHTML = '';
        if (recs.length === 0) {
            recommendationList.innerHTML = '<p>Inga rekommendationer för denna fas just nu.</p>';
            return;
        }
        recs.forEach(rec => {
            const item = document.createElement('div');
            item.classList.add('recommendation-item');
            item.innerHTML = `
                <a href="${rec.link}" target="_blank" style="text-decoration: none; color: inherit;">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </a>
            `;
            recommendationList.appendChild(item);
        });
    }

    function updateHandlePositionAndContent(day) {
        const angle = ((day - 1) / CYCLE_LENGTH) * 360 - 90;
        const radians = angle * (Math.PI / 180);

        const outerCircleRect = outerCircle.getBoundingClientRect();
        const innerCircleRect = innerCircle.getBoundingClientRect();

        const outerRadius = outerCircleRect.width / 2;
        const innerRadius = innerCircleRect.width / 2;
        const targetRadius = (outerRadius + innerRadius) / 2;

        const centerX = outerCircleRect.width / 2;
        const centerY = outerCircleRect.height / 2;

        const x = centerX + targetRadius * Math.cos(radians);
        const y = centerY + targetRadius * Math.sin(radians);

        dragHandle.style.left = `${x}px`;
        dragHandle.style.top = `${y}px`;

        const { phaseName, phaseDesc, recommendations } = getPhaseAndRecommendations(day);
        phaseDisplay.textContent = `${phaseName}`;
        phaseDescription.textContent = phaseDesc;
        currentDayDisplay.textContent = `Dag ${day}`;
        renderRecommendations(recommendations);
    }

    dragHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragHandle.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const circleRect = outerCircle.getBoundingClientRect();
        const centerX = circleRect.left + circleRect.width / 2;
        const centerY = circleRect.top + circleRect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        let angleRadians = Math.atan2(deltaY, deltaX);
        angleRadians += Math.PI / 2;
        if (angleRadians < 0) angleRadians += 2 * Math.PI;

        let angleDegrees = angleRadians * (180 / Math.PI);
        let calculatedDay = Math.round((angleDegrees / 360) * CYCLE_LENGTH) + 1;

        calculatedDay = Math.max(1, Math.min(calculatedDay, CYCLE_LENGTH));

        if (calculatedDay !== currentDay) {
            currentDay = calculatedDay;
            updateHandlePositionAndContent(currentDay);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        dragHandle.style.cursor = 'grab';
    });

    dragHandle.addEventListener('touchstart', (e) => {
        isDragging = true;
        dragHandle.style.cursor = 'grabbing';
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches[0]) return;

        const circleRect = outerCircle.getBoundingClientRect();
        const centerX = circleRect.left + circleRect.width / 2;
        const centerY = circleRect.top + circleRect.height / 2;

        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const deltaX = touchX - centerX;
        const deltaY = touchY - centerY;

        let angleRadians = Math.atan2(deltaY, deltaX);
        angleRadians += Math.PI / 2;
        if (angleRadians < 0) angleRadians += 2 * Math.PI;

        let angleDegrees = angleRadians * (180 / Math.PI);
        let calculatedDay = Math.round((angleDegrees / 360) * CYCLE_LENGTH) + 1;

        calculatedDay = Math.max(1, Math.min(calculatedDay, CYCLE_LENGTH));

        if (calculatedDay !== currentDay) {
            currentDay = calculatedDay;
            updateHandlePositionAndContent(currentDay);
        }
    }, { passive: false });

    document.addEventListener('touchend', () => {
        isDragging = false;
        dragHandle.style.cursor = 'grab';
    });

    updateHandlePositionAndContent(currentDay);
    window.addEventListener('resize', () => {
        updateHandlePositionAndContent(currentDay);
    });
});
