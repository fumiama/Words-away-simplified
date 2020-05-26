function WordsAway() {}
WordsAway.prototype.mixin = function (text, mixin = '\u200b', missBrackets = true) {
    text = Array.from(text);
    var result = '';
    var inBrackets = false;
    if (missBrackets) {
        for (let i of text) {
            if (inBrackets) {
                result += i;
            } else {
                result += (mixin + i);
            }
            if (i == '[') {
                inBrackets = true;
            } else if (i == ']') {
                inBrackets = false;
            }
        }
    } else {
        for (let i of text) {
            result += (mixin + i);
        }
    }
    return result;
}
WordsAway.prototype.turnOver = function (text, missBrackets = true) {
    var rows = text.split('\n');
    var result = '';
    for (let i of rows) {
        i = Array.from(i);
        let inBrackets = false;
        let before;
        let newRow = '';
        for (let j in i) {
            let y = i[j];
            if (y == '[' && missBrackets) {
                before = j;
                inBrackets = true;
            } else if (y == ']' && missBrackets && inBrackets) {
                inBrackets = false;
                newRow = i.slice(before, parseInt(j) + 1).join('') + newRow;
            } else if (!inBrackets) {
                newRow = y + newRow;
            }
        }
        if (inBrackets && missBrackets) {
            inBrackets = false;
            newRow = i.slice(before, i.length + 1).reverse().join('') + newRow;
        }
        newRow = '\u202e' + newRow + '\n';
        result += newRow;
    }
    return this.toggleBrackets(result);
}
WordsAway.prototype.wordsReverse = function (text, missBrackets = true) {
    var rows = text.split('\n');
    var result = '';
    for (let i in rows) {
        let inBrackets = false;
        let x = Array.from(rows[i]);
        let before;
        let newRow = '';
        for (let j = 0; j < x.length; j += 3) {
            let y = x.slice(j, j + 3);
            let hasBrackets = false;
            if (y.indexOf('[') != -1 && missBrackets) {
                inBrackets = true;
                hasBrackets = true;
            }
            if (y.indexOf(']') != -1 && missBrackets) {
                inBrackets = false;
                hasBrackets = true;
            }
            if (inBrackets | hasBrackets) {
                newRow += y.join('');
            } else {
                newRow += '\u200e' + x[j] + '\u202e' +
                    ((x[j + 2] !== undefined) ? this.toggleBracketsChar(x[j + 2]) : '') +
                    ((x[j + 1] !== undefined) ? this.toggleBracketsChar(x[j + 1]) : '') +
                    '\u202c';
            }
        }
        result += newRow + '\n';
    }
    return result;
}
WordsAway.prototype.toggleBrackets = function (text) {
    result = '';
    for (let i in text) {
        result += this.toggleBracketsChar(text[i]);
    }
    return result;
}
WordsAway.prototype.toggleBracketsChar = function (char) {
    return (char == '(') ? ')' :
        (char == ')') ? '(' :
        (char == '（') ? '）' :
        (char == '）') ? '（' :
        (char == '{') ? '}' :
        (char == '}') ? '{' :
        (char == '《') ? '》' :
        (char == '》') ? '《' :
        (char == '<') ? '>' :
        (char == '>') ? '<' :
        (char == '【') ? '】' :
        (char == '】') ? '【' :
        char;
}
WordsAway.prototype.verticalText = function (text, maxCol = 12, minHeight = 10) {
    text = text.replace(/[\n\r\s]/g, '');
    text = Array.from(text);
    var rowNum = Math.ceil(Math.max(text.length / maxCol, minHeight));
    var rows = [];
    for (let i = 0; i < rowNum; i++) {
        rows[i] = '';
    }
    for (let i in text) {
        rows[i % rowNum] += text[i] + ' ';
    }
    result = '';
    for (let i in rows) {
        result += rows[i] + '\n';
    }
    return result;
}
WordsAway.prototype.sameShape = function(text) {
    var styles = {
        'normal': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        //实际有效：асԁеցһіјӏոорԛѕսԝхуАВСЕНІЈКМОРԚЅΤՍԜХΥΖ
        'fake-normal': 'аbсԁеfցһіјkӏmոорԛrѕtսvԝхуzАВСDЕFGНІЈКLМNОРԚRЅΤՍVԜХΥΖ',
    }
    return this.replaceAll(text, styles['normal'], styles['fake-normal']);
}
WordsAway.prototype.replaceAll = function (text, from, to) {
    for (let i = 0; i < from.length; i++) {
        if (to[i] === undefined) {
            continue;
        }
        let step = (to.codePointAt(0) > 65536) ? 2 : 1;
        text = text.replace(new RegExp(from[i], 'g'), to.slice(step * i, step * i + step));
    }
    return text;
}