document.addEventListener('DOMContentLoaded', function() {
    // 脚注自動編號功能
    const footnotes = document.querySelectorAll('.footnote');
    footnotes.forEach((footnote, index) => {
        const footnoteNumber = index + 1;
        footnote.textContent = `[${footnoteNumber}]`;
    });

    // 悬浮脚注功能
    document.querySelectorAll('.footnote').forEach(footnote => {
        let tooltip = document.createElement('div');
        Object.assign(tooltip.style, {
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'normal',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            color: '#333',
            borderRadius: '5px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '10',
            wordWrap: 'break-word',
            maxWidth: '15em'
        });
        tooltip.innerHTML = footnote.getAttribute('data-footnote');
        document.body.appendChild(tooltip);

        let hideTimeout;

        footnote.addEventListener('mouseenter', function() {
            if (hideTimeout) clearTimeout(hideTimeout);

            const footnoteRect = footnote.getBoundingClientRect();
            let left = footnoteRect.left;
            let top = footnoteRect.bottom + window.scrollY + 10;
            const margin = 10;

            const tooltipRect = tooltip.getBoundingClientRect();
            if (left + tooltipRect.width > window.innerWidth - margin) {
                left = window.innerWidth - tooltipRect.width - margin;
            }
            if (left < margin) left = margin;

            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            tooltip.style.visibility = 'visible';
        });

        footnote.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                tooltip.style.visibility = 'hidden';
            }, 300);
        });

        tooltip.addEventListener('mouseenter', function() {
            if (hideTimeout) clearTimeout(hideTimeout);
        });

        tooltip.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                tooltip.style.visibility = 'hidden';
            }, 300);
        });
    });

    // 添加侧边栏按钮
    const sidebarButton = document.createElement('button');
    sidebarButton.textContent = '☰';
    sidebarButton.setAttribute('aria-label', 'Toggle sidebar');
    Object.assign(sidebarButton.style, {
        position: 'fixed',
        top: '1px',
        left: '1px',
        padding: '3px',
        backgroundColor: '#8c2424',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: '1000'
    });
    document.body.appendChild(sidebarButton);

    // 创建侧边栏
    const sidebar = document.createElement('div');
    Object.assign(sidebar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '300px',
        height: '100%',
        backgroundColor: '#f0f0f0',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        overflowY: 'hidden', // 默认隐藏滚动条
        transform: 'translateX(-100%)', // 初始移出可视范围
        transition: 'transform 0.3s ease', // 使用 transform 实现平滑动画
        zIndex: '999',
        visibility: 'hidden' // 初始设置为不可见
    });
    document.body.appendChild(sidebar);

    // 查找页面中的所有 h1, h2, h3 标题
    const headings = document.querySelectorAll('h1, h2, h3');
    if (headings.length > 0) {
        headings.forEach(heading => {
            const link = document.createElement('a');
            link.textContent = heading.textContent;
            link.href = `#${heading.id || heading.textContent.replace(/\s+/g, '-').toLowerCase()}`;
            heading.id = heading.id || heading.textContent.replace(/\s+/g, '-').toLowerCase();
            link.style.display = 'block';
            link.style.marginBottom = '10px';
            link.style.color = '#8c2424';
            link.style.textDecoration = 'none';

            // 根据标题的级别设置字体大小和缩进
            if (heading.tagName === 'H1') {
                link.style.fontSize = '1.5rem'; // 1级标题
                link.style.fontWeight = 'bold';
            } else if (heading.tagName === 'H2') {
                link.style.fontSize = '1.25rem'; // 2级标题
                link.style.paddingLeft = '10px';
            } else if (heading.tagName === 'H3') {
                link.style.fontSize = '1rem'; // 3级标题
                link.style.paddingLeft = '20px';
            }

            sidebar.appendChild(link);
        });
    }

    // 控制侧边栏的开关状态
    let isSidebarOpen = false;
    sidebarButton.addEventListener('click', function() {
        if (isSidebarOpen) {
            // 隐藏侧边栏
            sidebar.style.transform = 'translateX(-100%)';
            sidebar.style.visibility = 'hidden'; // 同时隐藏侧边栏的可见性
            sidebar.style.overflowY = 'hidden'; // 隐藏滚动条
        } else {
            // 显示侧边栏
            sidebar.style.transform = 'translateX(0)';
            sidebar.style.visibility = 'visible';
            sidebar.style.overflowY = 'auto'; // 显示滚动条
        }
        isSidebarOpen = !isSidebarOpen; // 切换状态
    });

    // 点击页面其他区域时隐藏侧边栏
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnSidebarButton = sidebarButton.contains(event.target);

        // 如果点击不在侧边栏或侧边栏按钮内，且侧边栏是打开的，则关闭侧边栏
        if (!isClickInsideSidebar && !isClickOnSidebarButton && isSidebarOpen) {
            sidebar.style.transform = 'translateX(-100%)';
            sidebar.style.visibility = 'hidden';
            sidebar.style.overflowY = 'hidden';
            isSidebarOpen = false;
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // 獲取所有的<h1>標題
    let headings = document.querySelectorAll("h1");
    let footnoteCounter = 1;

    headings.forEach(function(heading) {
        // 找到該<h1>後的所有腳注
        let footnotes = heading.nextElementSibling.querySelectorAll('.footnote');
        footnoteCounter = 1; // 每個<h1>下重新計數
        
        footnotes.forEach(function(footnote) {
            footnote.textContent = `[${footnoteCounter}]`; // 使用括號包裹腳注號
            footnoteCounter++;
        });
    });
});
