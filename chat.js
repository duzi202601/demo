/**
 * AI Bot 会话功能
 * 实现网页访问者与AI Bot的对话交互
 */

// 配置常量
const TYPING_DELAY_MIN = 800;  // 最小输入延迟（毫秒）
const TYPING_DELAY_RANGE = 700; // 延迟随机范围（毫秒）

// AI Bot 响应配置
const botResponses = {
    greetings: [
        "您好！很高兴为您服务，请问有什么可以帮助您的？",
        "你好！我是AI助手，随时为您解答问题。",
        "欢迎！请告诉我您需要什么帮助？"
    ],
    
    help: [
        "我可以帮助您解答各种问题，包括：\n• 产品咨询\n• 技术支持\n• 常见问题解答\n请直接告诉我您的问题！",
        "我是您的AI助手，可以为您提供信息查询、问题解答等服务。请问您需要什么帮助？"
    ],
    
    thanks: [
        "不客气！如果还有其他问题，随时可以问我。",
        "很高兴能帮到您！还有什么需要帮助的吗？",
        "您太客气了！希望我的回答对您有所帮助。"
    ],
    
    goodbye: [
        "再见！祝您生活愉快！",
        "感谢您的使用，期待下次为您服务！",
        "再见！如有需要，随时欢迎回来咨询。"
    ],
    
    default: [
        "感谢您的提问！我正在理解您的需求，请问您能详细描述一下吗？",
        "这是一个很好的问题！让我为您思考一下...",
        "我理解您的问题了。如果您能提供更多细节，我可以给出更准确的回答。",
        "谢谢您的咨询！请问还有什么具体的问题吗？"
    ]
};

// 关键词匹配规则
const keywordPatterns = [
    { keywords: ['你好', '您好', '嗨', 'hi', 'hello', '早上好', '下午好', '晚上好'], response: 'greetings' },
    { keywords: ['帮助', '帮忙', '怎么用', '如何', '功能', '可以做什么'], response: 'help' },
    { keywords: ['谢谢', '感谢', '多谢', 'thanks', 'thank'], response: 'thanks' },
    { keywords: ['再见', '拜拜', '下次见', 'bye', 'goodbye'], response: 'goodbye' }
];

/**
 * 获取当前时间字符串
 * @returns {string} 格式化的时间字符串
 */
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * 从数组中随机选择一个元素
 * @param {Array} arr - 选项数组
 * @returns {*} 随机选中的元素
 */
function getRandomResponse(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 根据用户输入生成AI Bot响应
 * @param {string} userMessage - 用户输入的消息
 * @returns {string} Bot的响应消息
 */
function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // 检查关键词匹配
    for (const pattern of keywordPatterns) {
        for (const keyword of pattern.keywords) {
            if (lowerMessage.includes(keyword)) {
                return getRandomResponse(botResponses[pattern.response]);
            }
        }
    }
    
    // 默认响应
    return getRandomResponse(botResponses.default);
}

/**
 * 创建消息DOM元素
 * @param {string} content - 消息内容
 * @param {boolean} isUser - 是否为用户消息
 * @returns {HTMLElement} 消息元素
 */
function createMessageElement(content, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    avatar.setAttribute('aria-label', isUser ? '用户头像' : 'AI Bot 头像');
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const text = document.createElement('p');
    // 处理换行符，将\n转换为<br>元素
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        text.appendChild(document.createTextNode(line));
        if (index < lines.length - 1) {
            text.appendChild(document.createElement('br'));
        }
    });
    
    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = getCurrentTime();
    
    contentDiv.appendChild(text);
    contentDiv.appendChild(time);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

/**
 * 创建正在输入提示元素
 * @returns {HTMLElement} 正在输入提示元素
 */
function createTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.id = 'typingIndicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    
    contentDiv.appendChild(indicator);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    return messageDiv;
}

/**
 * 滚动消息区域到底部
 */
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 发送消息处理函数
 */
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.getElementById('chatMessages');
    
    // 添加用户消息
    const userMessageEl = createMessageElement(message, true);
    chatMessages.appendChild(userMessageEl);
    
    // 清空输入框
    input.value = '';
    
    // 滚动到底部
    scrollToBottom();
    
    // 显示正在输入提示
    const typingIndicator = createTypingIndicator();
    chatMessages.appendChild(typingIndicator);
    scrollToBottom();
    
    // 模拟AI思考时间后回复
    setTimeout(() => {
        // 移除正在输入提示
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
        
        // 添加Bot回复
        const botResponse = generateBotResponse(message);
        const botMessageEl = createMessageElement(botResponse, false);
        chatMessages.appendChild(botMessageEl);
        
        // 滚动到底部
        scrollToBottom();
    }, TYPING_DELAY_MIN + Math.random() * TYPING_DELAY_RANGE);
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    
    // 更新初始消息时间
    const initialTime = document.querySelector('.message-time');
    if (initialTime) {
        initialTime.textContent = getCurrentTime();
    }
    
    // 发送按钮点击事件
    sendBtn.addEventListener('click', sendMessage);
    
    // 输入框回车事件
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 自动聚焦输入框
    userInput.focus();
});
