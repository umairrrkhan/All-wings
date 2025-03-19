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
document.addEventListener('DOMContentLoaded', initializeAnnouncementSystem);