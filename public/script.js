// Track announcement read status in local storage
function initializeAnnouncementSystem() {
    // Get existing read announcements from local storage
    const readAnnouncements = JSON.parse(localStorage.getItem('readAnnouncements')) || [];
    
    // Get all announcement dates
    const announcementDates = Array.from(document.querySelectorAll('.announcement-date'))
        .map(dateElement => dateElement.textContent.trim());
    
    // Add 'new' badge to unread announcements
    announcementDates.forEach((date, index) => {
        if (!readAnnouncements.includes(date)) {
            const announcementItem = document.querySelectorAll('.announcement-item')[index];
            const header = announcementItem.querySelector('.announcement-header');
            
            const newBadge = document.createElement('span');
            newBadge.textContent = 'NEW';
            newBadge.style.backgroundColor = '#3498db';
            newBadge.style.color = 'white';
            newBadge.style.padding = '4px 8px';
            newBadge.style.borderRadius = '4px';
            newBadge.style.fontSize = '12px';
            newBadge.style.marginLeft = '10px';
            newBadge.style.fontWeight = '600';
            newBadge.style.letterSpacing = '0.5px';
            
            header.insertBefore(newBadge, header.querySelector('.announcement-date'));
        }
    });
    
    // Mark announcements as read when viewed
    document.querySelectorAll('.announcement-item').forEach((item, index) => {
        const date = announcementDates[index];
        if (!readAnnouncements.includes(date)) {
            item.addEventListener('click', () => {
                readAnnouncements.push(date);
                localStorage.setItem('readAnnouncements', JSON.stringify(readAnnouncements));
                const newBadge = item.querySelector('.announcement-header span');
                if (newBadge && newBadge.textContent === 'NEW') {
                    newBadge.remove();
                }
            });
        }
    });
    
    // Update announcement button on home page
    if (document.querySelector('a[href="announcements.html"]')) {
        const hasUnread = announcementDates.some(date => !readAnnouncements.includes(date));
        if (hasUnread) {
            const announcementLink = document.querySelector('a[href="announcements.html"]');
            const newBadge = document.createElement('span');
            newBadge.textContent = 'NEW';
            newBadge.style.backgroundColor = '#3498db';
            newBadge.style.color = 'white';
            newBadge.style.padding = '4px 8px';
            newBadge.style.borderRadius = '4px';
            newBadge.style.fontSize = '12px';
            newBadge.style.marginLeft = '10px';
            newBadge.style.fontWeight = '600';
            newBadge.style.letterSpacing = '0.5px';
            announcementLink.appendChild(newBadge);
        }
    }
}

// Initialize the announcement system when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const companyInfo = document.querySelector('.company-info');
    const announcements = document.querySelectorAll('.announcement-item');

    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);

        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);

        if (companyInfo) {
            const rect = companyInfo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angleX = (centerY - clientY) / 30;
            const angleY = (clientX - centerX) / 30;
            
            companyInfo.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        }
    });

    // Smooth transform reset
    document.addEventListener('mouseleave', () => {
        if (companyInfo) {
            companyInfo.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });

    // Add tilt effect to announcements
    announcements.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (centerY - y) / 20;
            const angleY = (x - centerX) / 20;
            
            item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(30px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});