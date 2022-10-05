'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const comment = document.getElementById('comment');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p1');
  const scoreComment = document.querySelector('#result > p2');

  const quizSet = shuffle([
    {q: '卒業式で歌われる「蛍の光」は、もともとどんな曲？', c: ['スコットランドの民謡', '日本のわらべ歌', 'イギリスの讃美歌'], com: '答えはスコットランドの民謡。原曲は「オールド・ラング・サイン」。そのためメロディーはアメリカなどでも馴染みがある。'},
    {q: 'お守りを数える際の単位は？', c: ['体', '個', '本'], com: '答えは体。お守りには神様の分身が宿ると考えられているため。'},
    {q: 'ニトリの社名の由来は？', c: ['創業者の名前', 'ニワトリ', 'ラテン語で快適さ'], com: '答えは創業者の名前。創業者似鳥昭雄氏から名づけられた。'},
    {q: '大学ノートの「大学」はどこを指している？', c: ['東京大学', 'ハーバード大学', '京都大学'], com: '答えは東京大学。東大の前の文具店が売り始めた。当時そのノートは高価だったため、東大生ほど学問ができないと使えないという意味で名づけられた。（諸説あり）'},
    {q: '鉛筆には「H」「B」「F」という記号が付いているが、「F」はどんな意味？', c: ['firm', 'fiber', 'flight'], com: '答えはfirm。firmとは「しっかりした」という意味。ちなみに「H」はhard、「B」は「Black」の意味である。'},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;
    comment.textContent = quizSet[currentNum].com;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    comment.classList.add('hide');
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
      if (score === 0) {
        scoreComment.textContent = '残念！';
      } if (0 < score < 4) {
        scoreComment.textContent = 'もう少し頑張ろう！';
      } if (score === 4) {
        scoreComment.textContent = '惜しい！あとちょっと！';
      } if (score === 5) {
        scoreComment.textContent = 'すごい！あなたは雑学王です！';
      }
    } else {
      currentNum++;
      setQuiz();
    }
  });
  choices.addEventListener('click', () => {
    comment.classList.remove('hide');
  });
}