/* ============================================
   Text Tools - Main JavaScript File
   Includes: Dark/Light Mode Toggle, Word Counter Logic, Navigation
   ============================================ */

// ============================================
// Dark/Light Mode Toggle Functionality
// ============================================

/**
 * Initialize theme based on localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);
}

/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

/**
 * Update theme toggle icon based on current theme
 */
function updateThemeIcon(theme) {
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
    
    // Update charts when theme changes
    if (isWordCounterPage()) {
        const textInput = document.getElementById('text-input');
        if (textInput && textInput.value) {
            const wordCount = countWords(textInput.value);
            const readingTime = calculateReadingTime(wordCount);
            const speakingTime = calculateSpeakingTime(wordCount);
            const skimmingTime = calculateSkimmingTime(wordCount);
            updateCharts(textInput.value, wordCount, readingTime, speakingTime, skimmingTime);
        }
    }
}

// Initialize theme on page load
initTheme();

// Add event listeners to all theme toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
});

// ============================================
// Mobile Navigation Toggle
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ============================================
// Word Counter Tool Functionality
// ============================================

/**
 * Check if we're on the word counter page
 */
function isWordCounterPage() {
    return document.getElementById('text-input') !== null;
}

/**
 * Count words in text
 */
function countWords(text) {
    if (!text || text.trim().length === 0) {
        return 0;
    }
    // Split by whitespace and filter out empty strings
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Count characters (with spaces)
 */
function countCharacters(text) {
    return text ? text.length : 0;
}

/**
 * Count characters (without spaces)
 */
function countCharactersNoSpaces(text) {
    if (!text) return 0;
    return text.replace(/\s/g, '').length;
}

/**
 * Count sentences in text
 */
function countSentences(text) {
    if (!text || text.trim().length === 0) {
        return 0;
    }
    // Split by sentence-ending punctuation
    const sentences = text.trim().split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.length;
}

/**
 * Count paragraphs in text
 */
function countParagraphs(text) {
    if (!text || text.trim().length === 0) {
        return 0;
    }
    // Split by double line breaks or single line breaks
    const paragraphs = text.trim().split(/\n\s*\n/).filter(p => p.trim().length > 0);
    return paragraphs.length > 0 ? paragraphs.length : 1;
}

/**
 * Calculate reading time (assuming 200 words per minute)
 */
function calculateReadingTime(wordCount) {
    const wordsPerMinute = 200;
    const minutes = wordCount / wordsPerMinute;
    
    if (minutes < 1) {
        return '< 1 min';
    } else if (minutes < 2) {
        return '1 min';
    } else {
        return `${Math.ceil(minutes)} min`;
    }
}

/**
 * Calculate speaking time (assuming 150 words per minute for speeches)
 */
function calculateSpeakingTime(wordCount) {
    const wordsPerMinute = 150;
    const minutes = wordCount / wordsPerMinute;
    
    if (minutes < 1) {
        return '< 1 min';
    } else if (minutes < 2) {
        return '1 min';
    } else {
        return `${Math.ceil(minutes)} min`;
    }
}

/**
 * Calculate skimming time (assuming 400 words per minute)
 */
function calculateSkimmingTime(wordCount) {
    const wordsPerMinute = 400;
    const minutes = wordCount / wordsPerMinute;
    
    if (minutes < 1) {
        return '< 1 min';
    } else if (minutes < 2) {
        return '1 min';
    } else {
        return `${Math.ceil(minutes)} min`;
    }
}

/**
 * Count lines in text
 */
function countLines(text) {
    if (!text || text.trim().length === 0) return 0;
    return text.split('\n').length;
}

/**
 * Get unique words count
 */
function countUniqueWords(text) {
    if (!text || text.trim().length === 0) return 0;
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return new Set(words).size;
}

/**
 * Get all words from text
 */
function getWords(text) {
    if (!text || text.trim().length === 0) return [];
    return text.toLowerCase().match(/\b\w+\b/g) || [];
}

/**
 * Calculate average word length
 */
function calculateAverageWordLength(text) {
    const words = getWords(text);
    if (words.length === 0) return 0;
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    return (totalLength / words.length).toFixed(1);
}

/**
 * Calculate average sentence length (in words)
 */
function calculateAverageSentenceLength(text) {
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    if (sentenceCount === 0) return 0;
    return (wordCount / sentenceCount).toFixed(1);
}

/**
 * Calculate average words per paragraph
 */
function calculateAverageWordsPerParagraph(text) {
    const wordCount = countWords(text);
    const paragraphCount = countParagraphs(text);
    if (paragraphCount === 0) return 0;
    return (wordCount / paragraphCount).toFixed(1);
}

/**
 * Count syllables in a word (approximation)
 */
function countSyllablesInWord(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}

/**
 * Count total syllables in text
 */
function countSyllables(text) {
    const words = getWords(text);
    return words.reduce((sum, word) => sum + countSyllablesInWord(word), 0);
}

/**
 * Calculate Flesch Reading Ease Score
 */
function calculateFleschReadingEase(text) {
    const sentences = countSentences(text);
    const words = countWords(text);
    const syllables = countSyllables(text);
    
    if (sentences === 0 || words === 0) return null;
    
    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;
    
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Get reading level grade from Flesch score
 */
function getReadingLevel(fleschScore) {
    if (fleschScore === null) return '-';
    if (fleschScore >= 90) return '5th Grade';
    if (fleschScore >= 80) return '6th Grade';
    if (fleschScore >= 70) return '7th Grade';
    if (fleschScore >= 60) return '8th-9th Grade';
    if (fleschScore >= 50) return '10th-12th Grade';
    if (fleschScore >= 30) return 'College';
    return 'College Graduate';
}

/**
 * Basic language detection (very basic, English-focused)
 */
function detectLanguage(text) {
    if (!text || text.trim().length === 0) return '-';
    
    // Common English words
    const commonEnglishWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'];
    const words = getWords(text).slice(0, 50); // Check first 50 words
    const englishMatches = words.filter(word => commonEnglishWords.includes(word)).length;
    const englishRatio = englishMatches / Math.min(words.length, 50);
    
    if (englishRatio > 0.2) {
        return 'English';
    }
    
    // Very basic detection - default to English for now
    // In a real implementation, you'd use a more sophisticated method
    return 'English (likely)';
}

/**
 * Basic sentiment analysis
 */
function analyzeSentiment(text) {
    if (!text || text.trim().length === 0) return { score: 0, label: '-' };
    
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'joy', 'pleased', 'delighted', 'perfect', 'best', 'awesome', 'brilliant', 'outstanding', 'superb', 'marvelous', 'terrific', 'fabulous'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'angry', 'disappointed', 'worst', 'poor', 'fail', 'failure', 'wrong', 'error', 'problem', 'issue', 'difficult', 'hard', 'tough', 'struggle'];
    
    const words = getWords(text);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    if (total === 0) return { score: 0, label: 'Neutral' };
    
    const score = ((positiveCount - negativeCount) / total) * 100;
    
    if (score > 20) return { score, label: 'Positive' };
    if (score < -20) return { score, label: 'Negative' };
    return { score, label: 'Neutral' };
}

/**
 * Find longest and shortest words
 */
function findLongestAndShortestWords(text) {
    const words = getWords(text);
    if (words.length === 0) return { longest: '-', shortest: '-' };
    
    const sortedByLength = [...words].sort((a, b) => b.length - a.length);
    const longest = sortedByLength[0];
    const shortest = [...words].sort((a, b) => a.length - b.length)[0];
    
    return { longest, shortest };
}

/**
 * Get most frequent words (top N)
 */
function getMostFrequentWords(text, topN = 10) {
    const words = getWords(text);
    if (words.length === 0) return [];
    
    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([word, count]) => ({ word, count }));
}

/**
 * Get character frequency
 */
function getCharacterFrequency(text) {
    if (!text) return {};
    
    const frequency = {};
    const cleanText = text.toLowerCase().replace(/\s/g, '');
    
    for (let char of cleanText) {
        if (/[a-z0-9]/.test(char)) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
    }
    
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50); // Top 50 characters
}

/**
 * Find duplicate words (words that appear more than once)
 */
function findDuplicateWords(text) {
    const words = getWords(text);
    if (words.length === 0) return [];
    
    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
        .filter(([word, count]) => count > 1)
        .sort((a, b) => b[1] - a[1])
        .map(([word, count]) => ({ word, count }));
}

/**
 * Update all statistics displays
 */
function updateStatistics() {
    const textInput = document.getElementById('text-input');
    if (!textInput) return;
    
    const text = textInput.value;
    
    // Calculate all basic statistics
    const wordCount = countWords(text);
    const charCount = countCharacters(text);
    const charNoSpacesCount = countCharactersNoSpaces(text);
    const sentenceCount = countSentences(text);
    const paragraphCount = countParagraphs(text);
    const lineCount = countLines(text);
    const uniqueWordsCount = countUniqueWords(text);
    const readingTime = calculateReadingTime(wordCount);
    const speakingTime = calculateSpeakingTime(wordCount);
    const skimmingTime = calculateSkimmingTime(wordCount);
    
    // Calculate advanced statistics
    const avgWordLength = calculateAverageWordLength(text);
    const avgSentenceLength = calculateAverageSentenceLength(text);
    const avgWordsPerParagraph = calculateAverageWordsPerParagraph(text);
    const syllableCount = countSyllables(text);
    const fleschScore = calculateFleschReadingEase(text);
    const readingLevel = getReadingLevel(fleschScore);
    const detectedLanguage = detectLanguage(text);
    const sentiment = analyzeSentiment(text);
    const { longest, shortest } = findLongestAndShortestWords(text);
    
    // Update dashboard
    const dashboardWordCount = document.getElementById('dashboard-word-count');
    const dashboardCharCount = document.getElementById('dashboard-char-count');
    const dashboardSentenceCount = document.getElementById('dashboard-sentence-count');
    const dashboardParagraphCount = document.getElementById('dashboard-paragraph-count');
    const dashboardReadingTime = document.getElementById('dashboard-reading-time');
    const dashboardSpeakingTime = document.getElementById('dashboard-speaking-time');
    const dashboardReadability = document.getElementById('dashboard-readability');
    const dashboardReadingLevel = document.getElementById('dashboard-reading-level');
    const dashboardUniqueWords = document.getElementById('dashboard-unique-words');
    const dashboardAvgWordLength = document.getElementById('dashboard-avg-word-length');
    const dashboardAvgSentenceLength = document.getElementById('dashboard-avg-sentence-length');
    const dashboardSentiment = document.getElementById('dashboard-sentiment');
    
    if (dashboardWordCount) dashboardWordCount.textContent = wordCount.toLocaleString();
    if (dashboardCharCount) dashboardCharCount.textContent = charCount.toLocaleString();
    if (dashboardSentenceCount) dashboardSentenceCount.textContent = sentenceCount.toLocaleString();
    if (dashboardParagraphCount) dashboardParagraphCount.textContent = paragraphCount.toLocaleString();
    if (dashboardReadingTime) dashboardReadingTime.textContent = readingTime;
    if (dashboardSpeakingTime) dashboardSpeakingTime.textContent = speakingTime;
    if (dashboardReadability) dashboardReadability.textContent = fleschScore !== null ? fleschScore : '-';
    if (dashboardReadingLevel) dashboardReadingLevel.textContent = readingLevel;
    if (dashboardUniqueWords) dashboardUniqueWords.textContent = uniqueWordsCount.toLocaleString();
    if (dashboardAvgWordLength) dashboardAvgWordLength.textContent = avgWordLength;
    if (dashboardAvgSentenceLength) dashboardAvgSentenceLength.textContent = avgSentenceLength;
    if (dashboardSentiment) dashboardSentiment.textContent = sentiment.label;
    
    // Update summary card
    const summaryWordCount = document.getElementById('summary-word-count');
    const summaryCharCount = document.getElementById('summary-char-count');
    const summarySentenceCount = document.getElementById('summary-sentence-count');
    const summaryReadingTime = document.getElementById('summary-reading-time');
    
    if (summaryWordCount) summaryWordCount.textContent = wordCount.toLocaleString();
    if (summaryCharCount) summaryCharCount.textContent = charCount.toLocaleString();
    if (summarySentenceCount) summarySentenceCount.textContent = sentenceCount.toLocaleString();
    if (summaryReadingTime) summaryReadingTime.textContent = readingTime;
    
    // Update basic statistics
    const wordCountEl = document.getElementById('word-count');
    const charCountEl = document.getElementById('char-count');
    const charNoSpacesCountEl = document.getElementById('char-no-spaces-count');
    const sentenceCountEl = document.getElementById('sentence-count');
    const paragraphCountEl = document.getElementById('paragraph-count');
    const lineCountEl = document.getElementById('line-count');
    const uniqueWordsCountEl = document.getElementById('unique-words-count');
    const readingTimeEl = document.getElementById('reading-time');
    const speakingTimeEl = document.getElementById('speaking-time');
    const skimmingTimeEl = document.getElementById('skimming-time');
    
    if (wordCountEl) wordCountEl.textContent = wordCount.toLocaleString();
    if (charCountEl) charCountEl.textContent = charCount.toLocaleString();
    if (charNoSpacesCountEl) charNoSpacesCountEl.textContent = charNoSpacesCount.toLocaleString();
    if (sentenceCountEl) sentenceCountEl.textContent = sentenceCount.toLocaleString();
    if (paragraphCountEl) paragraphCountEl.textContent = paragraphCount.toLocaleString();
    if (lineCountEl) lineCountEl.textContent = lineCount.toLocaleString();
    if (uniqueWordsCountEl) uniqueWordsCountEl.textContent = uniqueWordsCount.toLocaleString();
    if (readingTimeEl) readingTimeEl.textContent = readingTime;
    if (speakingTimeEl) speakingTimeEl.textContent = speakingTime;
    if (skimmingTimeEl) skimmingTimeEl.textContent = skimmingTime;
    
    // Update advanced statistics
    const avgWordLengthEl = document.getElementById('avg-word-length');
    const avgSentenceLengthEl = document.getElementById('avg-sentence-length');
    const avgWordsPerParagraphEl = document.getElementById('avg-words-per-paragraph');
    const syllableCountEl = document.getElementById('syllable-count');
    const readabilityScoreEl = document.getElementById('readability-score');
    const readingLevelEl = document.getElementById('reading-level');
    const detectedLanguageEl = document.getElementById('detected-language');
    const sentimentEl = document.getElementById('sentiment');
    const longestWordEl = document.getElementById('longest-word');
    const shortestWordEl = document.getElementById('shortest-word');
    
    if (avgWordLengthEl) avgWordLengthEl.textContent = avgWordLength;
    if (avgSentenceLengthEl) avgSentenceLengthEl.textContent = avgSentenceLength;
    if (avgWordsPerParagraphEl) avgWordsPerParagraphEl.textContent = avgWordsPerParagraph;
    if (syllableCountEl) syllableCountEl.textContent = syllableCount.toLocaleString();
    if (readabilityScoreEl) readabilityScoreEl.textContent = fleschScore !== null ? fleschScore : '-';
    if (readingLevelEl) readingLevelEl.textContent = readingLevel;
    if (detectedLanguageEl) detectedLanguageEl.textContent = detectedLanguage;
    if (sentimentEl) sentimentEl.textContent = sentiment.label;
    if (longestWordEl) longestWordEl.textContent = longest;
    if (shortestWordEl) shortestWordEl.textContent = shortest;
    
    // Update top words
    updateTopWords(text);
    
    // Update character frequency
    updateCharacterFrequency(text);
    
    // Update duplicate words
    updateDuplicateWords(text);
    
    // Update charts
    updateCharts(text, wordCount, readingTime, speakingTime, skimmingTime);
}

/**
 * Update top words display
 */
function updateTopWords(text) {
    const topWordsList = document.getElementById('top-words-list');
    if (!topWordsList) return;
    
    const topWords = getMostFrequentWords(text, 10);
    
    if (topWords.length === 0) {
        topWordsList.innerHTML = '<p class="empty-message">Start typing to see most frequent words...</p>';
        return;
    }
    
    topWordsList.innerHTML = topWords.map(({ word, count }) => 
        `<span class="word-tag">
            ${word}
            <span class="word-count">${count}</span>
        </span>`
    ).join('');
}

/**
 * Update character frequency display
 */
function updateCharacterFrequency(text) {
    const charFrequencyTable = document.getElementById('char-frequency-table');
    if (!charFrequencyTable) return;
    
    const frequency = getCharacterFrequency(text);
    
    if (frequency.length === 0) {
        charFrequencyTable.innerHTML = '<p class="empty-message">Start typing to see character frequency...</p>';
        return;
    }
    
    charFrequencyTable.innerHTML = frequency.map(([char, count]) => 
        `<div class="char-frequency-item">
            <div class="char-frequency-char">${char}</div>
            <div class="char-frequency-count">${count}</div>
        </div>`
    ).join('');
}

/**
 * Update duplicate words display
 */
function updateDuplicateWords(text) {
    const duplicateWordsList = document.getElementById('duplicate-words-list');
    if (!duplicateWordsList) return;
    
    const duplicates = findDuplicateWords(text);
    
    if (duplicates.length === 0) {
        duplicateWordsList.innerHTML = '<p class="empty-message">No duplicate words found. Start typing to analyze...</p>';
        return;
    }
    
    duplicateWordsList.innerHTML = duplicates.slice(0, 20).map(({ word, count }) => 
        `<span class="duplicate-word-tag">
            ${word}
            <span class="duplicate-count">${count}x</span>
        </span>`
    ).join('');
}

// Chart instances (global to allow updates)
let wordFrequencyChartInstance = null;
let readingTimeChartInstance = null;

/**
 * Update charts with new data
 */
function updateCharts(text, wordCount, readingTime, speakingTime, skimmingTime) {
    // Update word frequency chart
    updateWordFrequencyChart(text);
    
    // Update reading time chart
    updateReadingTimeChart(wordCount, readingTime, speakingTime, skimmingTime);
}

/**
 * Update word frequency chart
 */
function updateWordFrequencyChart(text) {
    const canvas = document.getElementById('wordFrequencyChart');
    if (!canvas) return;
    
    const topWords = getMostFrequentWords(text, 10);
    
    if (topWords.length === 0) {
        if (wordFrequencyChartInstance) {
            wordFrequencyChartInstance.destroy();
            wordFrequencyChartInstance = null;
        }
        return;
    }
    
    const labels = topWords.map(item => item.word);
    const data = topWords.map(item => item.count);
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8f9fa' : '#212529';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    if (wordFrequencyChartInstance) {
        wordFrequencyChartInstance.data.labels = labels;
        wordFrequencyChartInstance.data.datasets[0].data = data;
        wordFrequencyChartInstance.options.plugins.legend.labels.color = textColor;
        wordFrequencyChartInstance.options.scales.x.ticks.color = textColor;
        wordFrequencyChartInstance.options.scales.y.ticks.color = textColor;
        wordFrequencyChartInstance.options.scales.x.grid.color = gridColor;
        wordFrequencyChartInstance.options.scales.y.grid.color = gridColor;
        wordFrequencyChartInstance.update();
    } else {
        wordFrequencyChartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Frequency',
                    data: data,
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(168, 85, 247, 0.8)',
                        'rgba(249, 115, 22, 0.8)',
                        'rgba(20, 184, 166, 0.8)',
                        'rgba(236, 72, 153, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(234, 179, 8, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(6, 182, 212, 0.8)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(168, 85, 247, 1)',
                        'rgba(249, 115, 22, 1)',
                        'rgba(20, 184, 166, 1)',
                        'rgba(236, 72, 153, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(234, 179, 8, 1)',
                        'rgba(99, 102, 241, 1)',
                        'rgba(6, 182, 212, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                        titleColor: textColor,
                        bodyColor: textColor,
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColor,
                            stepSize: 1
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    x: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        }
                    }
                }
            }
        });
    }
}

/**
 * Update reading time analysis chart
 */
function updateReadingTimeChart(wordCount, readingTime, speakingTime, skimmingTime) {
    const canvas = document.getElementById('readingTimeChart');
    if (!canvas) return;
    
    if (wordCount === 0) {
        if (readingTimeChartInstance) {
            readingTimeChartInstance.destroy();
            readingTimeChartInstance = null;
        }
        return;
    }
    
    // Parse time strings to numbers for chart
    const parseTime = (timeStr) => {
        if (timeStr === '< 1 min') return 0.5;
        const match = timeStr.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    };
    
    const readingMinutes = parseTime(readingTime);
    const speakingMinutes = parseTime(speakingTime);
    const skimmingMinutes = parseTime(skimmingTime);
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f8f9fa' : '#212529';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    if (readingTimeChartInstance) {
        readingTimeChartInstance.data.datasets[0].data = [readingMinutes, speakingMinutes, skimmingMinutes];
        readingTimeChartInstance.options.plugins.legend.labels.color = textColor;
        readingTimeChartInstance.options.scales.y.ticks.color = textColor;
        readingTimeChartInstance.options.scales.y.grid.color = gridColor;
        readingTimeChartInstance.update();
    } else {
        readingTimeChartInstance = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Reading Time', 'Speaking Time', 'Skimming Time'],
                datasets: [{
                    label: 'Time (minutes)',
                    data: [readingMinutes, speakingMinutes, skimmingMinutes],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(20, 184, 166, 0.8)',
                        'rgba(249, 115, 22, 0.8)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(20, 184, 166, 1)',
                        'rgba(249, 115, 22, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: textColor,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                        titleColor: textColor,
                        bodyColor: textColor,
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                if (value < 1) return 'Less than 1 minute';
                                return value + ' minute' + (value !== 1 ? 's' : '');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColor,
                            stepSize: 1,
                            callback: function(value) {
                                if (value < 1) return '< 1 min';
                                return value + ' min';
                            }
                        },
                        grid: {
                            color: gridColor
                        }
                    },
                    x: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

/**
 * Clear text input and reset statistics
 */
function clearText(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const textInput = document.getElementById('text-input');
    if (textInput) {
        textInput.value = '';
        updateStatistics();
        textInput.focus();
    }
}

// Make function globally accessible
window.clearText = clearText;

/**
 * Copy text to clipboard
 */
async function copyToClipboard(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const textInput = document.getElementById('text-input');
    if (!textInput) {
        console.error('Text input not found');
        return;
    }
    
    const text = textInput.value;
    if (!text || text.trim().length === 0) {
        alert('No text to copy. Please enter some text first.');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Show feedback
        const copyBtn = document.getElementById('copy-btn');
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = 'var(--accent-primary)';
            copyBtn.style.color = 'white';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
                copyBtn.style.color = '';
            }, 2000);
        }
    } catch (err) {
        console.error('Clipboard API failed, trying fallback:', err);
        // Fallback for older browsers
        try {
            textInput.select();
            const successful = document.execCommand('copy');
            if (successful) {
                alert('Text copied to clipboard!');
            } else {
                alert('Failed to copy text. Please try selecting and copying manually.');
            }
        } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
            alert('Unable to copy text. Please select and copy manually.');
        }
    }
}

// Make function globally accessible
window.copyToClipboard = copyToClipboard;

/**
 * Download text as .txt file
 */
function downloadText(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const textInput = document.getElementById('text-input');
    if (!textInput) {
        console.error('Text input not found');
        return;
    }
    
    const text = textInput.value;
    if (!text || text.trim().length === 0) {
        alert('Please enter some text before downloading.');
        return;
    }
    
    try {
        // Create blob and download link
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text-content.txt';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    } catch (err) {
        console.error('Download failed:', err);
        alert('Failed to download file. Please try again.');
    }
}

// Make function globally accessible
window.downloadText = downloadText;

/**
 * Initialize Word Counter tool
 */
function initWordCounter() {
    if (!isWordCounterPage()) return;
    
    const textInput = document.getElementById('text-input');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    // Add event listeners for text input
    if (textInput) {
        // Update statistics on input
        textInput.addEventListener('input', updateStatistics);
        
        // Update statistics on paste
        textInput.addEventListener('paste', function() {
            setTimeout(updateStatistics, 10);
        });
        
        // Initial statistics update
        updateStatistics();
    }
    
    // Attach button event listeners - simplified approach
    if (clearBtn) {
        clearBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearText(e);
        };
    }
    
    if (copyBtn) {
        copyBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            copyToClipboard(e);
        };
    }
    
    if (downloadBtn) {
        downloadBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            downloadText(e);
        };
    }
}

// Initialize Word Counter when DOM is ready - multiple approaches for compatibility
function initializeWordCounterTool() {
    // Try multiple times to ensure buttons are found
    if (document.getElementById('text-input')) {
        initWordCounter();
    } else {
        // Retry after a short delay if elements aren't ready
        setTimeout(initializeWordCounterTool, 50);
    }
}

// Use DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeWordCounterTool);

// Also try on window load as fallback
window.addEventListener('load', function() {
    if (document.getElementById('text-input') && !document.getElementById('clear-btn').onclick) {
        initWordCounter();
    }
});

// Immediate initialization if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initializeWordCounterTool, 100);
}

// ============================================
// Contact Form Handling (Optional Enhancement)
// ============================================

/**
 * Handle contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:contact@texttools.com?subject=${encodeURIComponent(subject || 'Contact from Text Tools')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Optional: Show confirmation message
        setTimeout(() => {
            alert('Your email client should open. If it doesn\'t, please send your message to contact@texttools.com');
        }, 500);
    });
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', initContactForm);

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ============================================
// Accessibility Enhancements
// ============================================

/**
 * Add keyboard navigation support
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for theme toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.setAttribute('tabindex', '0');
        toggle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    });
    
    // Add ARIA labels where needed
    const textInput = document.getElementById('text-input');
    if (textInput && !textInput.getAttribute('aria-label')) {
        textInput.setAttribute('aria-label', 'Text input area for word counting');
    }
});

// ============================================
// Performance Optimization
// ============================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced update for statistics if needed (optional optimization)
// const debouncedUpdateStatistics = debounce(updateStatistics, 100);
// Uncomment above and use debouncedUpdateStatistics instead of updateStatistics
// if you notice performance issues with very long texts

