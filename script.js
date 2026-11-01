'use strict';

// ===================== 유형 데이터 =====================
const TYPES = [
 {id:'squirrel',short:'다람쥐',name:'호기심 발동 다람쥐',quote:'새로운 AI 도구? 일단 궁금해서 못 참겠어요!',light:'#FBE7D5',tint:'#F6D3A8',bar:'#E7A86D',features:['새로운 AI 기능과 도구를 발견하면 직접 탐색한다.','다양한 사용 방법을 실험하는 것을 즐긴다.','새로운 기술이 제공하는 가능성에 관심이 많다.'],strength:'탐색과 새로운 시도',thought:'새로운 기능이 실제 영유아의 경험에 왜 필요한지도 함께 생각하기'},
 {id:'beaver',short:'비버',name:'업무 뚝딱 비버',quote:'일은 뚝딱, 중요한 일에 시간을 더 쓰고 싶어요!',light:'#F1E8DB',tint:'#E7D4BC',bar:'#BE956F',features:['반복적인 업무를 효율적으로 처리하는 데 관심이 있다.','AI를 실질적인 업무 보조 도구로 활용하려 한다.','절약한 시간과 에너지를 다른 중요한 업무에 활용하고 싶어 한다.'],strength:'효율적이고 목적이 분명한 활용',thought:'업무 효율뿐 아니라 실제 사실과 맥락을 확인하기'},
 {id:'otter',short:'수달',name:'놀이 레이더 수달',quote:'우리 아이들 놀이에 연결할 방법이 없을까?',light:'#E5F3EE',tint:'#C6E5D9',bar:'#80B9A7',features:['영유아의 흥미와 실제 놀이 흐름을 중요하게 생각한다.','AI를 놀이 지원과 자료 제작에 연결하려 한다.','AI가 제시한 결과를 영유아의 경험에 맞게 바꾸는 데 관심이 있다.'],strength:'놀이 중심의 교육적 연결',thought:'디지털 자원을 사용하지 않는 편이 더 적절한 순간도 고려하기'},
 {id:'owl',short:'부엉이',name:'팩트체크 부엉이',quote:'잠깐! 이 정보 정말 믿어도 될까요?',light:'#F0ECF5',tint:'#DFD5EF',bar:'#B0A0D9',features:['AI가 제시하는 정보와 결과를 확인한다.','정확성과 신뢰성을 중요하게 생각한다.','결과를 그대로 받아들이기보다 비교하고 검토한다.'],strength:'비판적 검증과 신뢰성 판단',thought:'정확성을 확인하면서 새로운 가능성도 열어두기'},
 {id:'hedgehog',short:'고슴도치',name:'기준 콕콕 고슴도치',quote:'좋아요! 그런데 어떤 기준으로 활용할까요?',light:'#FAECE6',tint:'#F2D1CB',bar:'#E6A39B',features:['개인정보, 아동권리, 저작권과 윤리적 기준을 중요하게 생각한다.','영유아교육에서 AI를 활용할 때 지켜야 할 원칙에 관심이 있다.','기관 차원의 활용 기준과 안전한 환경을 고민한다.'],strength:'책임감 있는 활용과 기준 마련',thought:'원칙을 바탕으로 안전하게 시도할 수 있는 대안도 탐색하기'},
 {id:'rabbit',short:'토끼',name:'내 속도대로 토끼',quote:'조금씩 해봐도 괜찮아요. 내 속도로 배우는 중!',light:'#F0EBF5',tint:'#E2D7F0',bar:'#B8A4D8',features:['익숙한 방식을 존중한다.','새로운 AI 도구를 서두르지 않고 천천히 익힌다.','작은 기능이나 익숙한 업무부터 활용을 시도한다.'],strength:'신중하고 점진적인 접근',thought:'익숙한 방법에서 출발해 새로운 시도를 조금씩 이어가기'}
];
const BY_ID = Object.fromEntries(TYPES.map(t => [t.id,t]));
const img = (id) => `assets/${id}.png`;

// 문항·선택지 원문: 확정 기획서와 동일. score 배열은 A~D 선택 시 점수를 받을 유형.
const QUESTIONS = [
 {q:'요즘 AI, 얼마나 자주 사용하고 있나요?',help:'현재 활용 경험 확인용 질문이며 유형 점수에 반영되지 않아요.',options:['아직 한 번도 사용해 본 적 없어요.','한두 번 사용해 본 정도예요.','필요할 때 가끔 사용해요.','일주일에 몇 번씩 사용해요.','거의 매일, 때로는 하루에도 여러 번 사용해요.'],score:null},
 {q:'새로운 AI 도구를 알게 되었어요! 가장 먼저 드는 생각은?',options:['"오! 이건 또 뭐야?" 새로운 기능부터 눌러보고 싶어요.','"내 일을 줄여줄 수 있을까?" 실용적인 기능부터 살펴봐요.','"우리 아이들 놀이에도 연결할 수 있을까?" 활용 장면을 떠올려요.','"정말 잘 작동할까?" 기능과 결과의 정확성을 확인해 봐요.'],score:['squirrel','beaver','otter','owl']},
 {q:'내일까지 가정통신문을 작성해야 하는데 시간이 부족해요!',options:['먼저 기관의 안내 기준과 포함하면 안 되는 정보를 확인해요.','AI로 초안을 만들고 직접 고쳐서 빠르게 마무리해요.','익숙한 방식으로 작성하고, 어려운 문장 한두 개만 AI의 도움을 받아요.','AI에 다양한 문구와 구성 아이디어를 요청해 보고 마음에 드는 것을 골라요.'],score:['hedgehog','beaver','rabbit','squirrel']},
 {q:'아이들이 자연물과 색깔을 이용해 놀이하고 있어요. 놀이 지원 방법을 고민하다 AI에게 아이디어를 물어봤어요. 여러 제안이 나왔다면 나는?',options:['한꺼번에 여러 가지를 시도하기보다, 익숙한 자료에 제안 하나만 더해봐요.','아이들이 지금 즐기는 놀이에서 자연스럽게 이어질 수 있는 제안을 골라요.','또 다른 방법도 궁금해져서 AI에게 새로운 아이디어를 더 요청해 봐요.','AI가 실제로 관찰하지 않은 아이들의 행동을 근거로 제안한 부분은 없는지 확인해요.'],score:['rabbit','otter','squirrel','owl']},
 {q:'어린이집에서 AI 활용 사례를 함께 나누는 시간이 생겼어요. 내가 가장 궁금한 이야기는?',options:['AI가 틀린 정보를 알려줬을 때, 어떻게 발견하고 바로잡았을까?','개인정보와 저작권을 지키면서 AI를 활용하려면 어떻게 해야 할까?','반복적인 서류 업무를 AI로 얼마나 간편하게 정리할 수 있을까?','AI를 처음 접하는 사람도 쉽게 따라 할 수 있는 방법은 무엇일까?'],score:['owl','hedgehog','beaver','rabbit']},
 {q:'우리 반에서 새로운 놀이자료가 필요해졌어요. AI를 활용한다면?',options:['"이런 자료도 만들 수 있나?" 다양한 방식으로 생성해 봐요.','아이들이 자료를 선택하거나 바꾸어 새로운 놀이로 이어갈 방법을 생각해요.','자료 제작 시간을 줄일 수 있도록 필요한 도안을 만들어 활용해요.','자료의 저작권, 적절성, 사용 조건을 확인한 후 활용해요.'],score:['squirrel','otter','beaver','hedgehog']},
 {q:'AI 도우미에게 딱 하나의 특별한 능력을 추가할 수 있다면?',help:'“이런 기능이 있으면 진짜 좋겠다!” 싶은 것을 하나 골라보세요.',options:['놀이 연결 능력 — 우리 아이들의 놀이 흐름을 바탕으로 새로운 놀이 지원 가능성을 함께 찾아주는 기능','안전 기준 알림 능력 — AI를 활용할 때 개인정보·저작권 등 주의해야 할 부분을 미리 알려주는 기능','차근차근 안내 능력 — 처음 사용하는 AI 기능도 내가 이해할 수 있도록 한 단계씩 알려주는 기능','오류 탐지 능력 — AI가 알려준 정보의 근거를 확인하고 잘못된 내용을 찾아주는 기능'],score:['otter','hedgehog','rabbit','owl']},
 {q:'"우리 어린이집에서도 AI를 조금 더 활용해 볼까요?"라는 이야기가 나왔어요.',options:['함께 활용할 수 있는 기준과 개인정보 보호 원칙부터 마련하면 좋겠어요.','AI가 낯선 사람도 있으니 쉬운 기능부터 경험해 볼 기회가 있으면 좋겠어요.','반복적인 서류나 업무에서 시간을 줄일 수 있는 방법부터 찾아보면 좋겠어요.','실제 영유아 놀이에 도움이 되는 사례를 함께 탐색해 보면 좋겠어요.'],score:['hedgehog','rabbit','beaver','otter']},
 {q:'아이들이 상상동물을 만들고 있는데, AI로도 표현해 보자는 제안이 나왔어요.',options:['AI가 표현한 모습과 아이들이 처음 생각한 모습이 어떻게 다른지 비교해 봐요.','조건을 다양하게 바꾸어 여러 모습의 상상동물을 만들어 보고 싶어요.','유아 작품이나 사진을 입력해도 되는지, 활용 과정에서 지켜야 할 기준을 먼저 확인해요.','AI의 결과를 아이들이 선택·수정하고, 다시 블록이나 미술놀이로 표현하도록 연결해 봐요.'],score:['owl','squirrel','hedgehog','otter']},
 {q:'AI가 만들어 준 결과가 생각했던 것과 달라요. 이럴 땐?',options:['사용할 수 있는 부분을 골라 직접 수정하고 필요한 작업을 마무리해요.','익숙한 방법으로 돌아가 해결하고, AI는 다음에 조금씩 다시 시도해 봐요.','어디가 잘못됐는지 확인하고, 필요한 정보와 비교해 수정해요.','질문이나 조건을 여러 방식으로 바꾸면서 원하는 결과를 찾아봐요.'],score:['beaver','rabbit','owl','squirrel']},
 {q:'AI로 관찰기록이나 보육일지를 작성하는 것에 대해 가장 먼저 드는 생각은?',help:'여러 생각에 공감할 수 있어요. 가장 옳은 답이 아니라, 가장 먼저 드는 생각을 골라 주세요. 유형 점수에는 반영되지 않아요.',options:['"내가 관찰한 사실을 문장으로 정리하는 보조 도구라면 활용할 수 있겠어요."','"관찰기록만큼은 교사가 직접 작성하는 편이 더 좋겠어요."','"기관의 명확한 기준과 개인정보 보호 절차가 먼저 필요하겠어요."','"시간은 줄일 수 있겠지만, 사실의 왜곡이나 누락이 없는지 꼭 검토해야겠어요."'],score:null}
];

let answers=Array(QUESTIONS.length).fill(null);
let current=0;
let selectedPrimary=null;
let isSubmitting=false;
let client=null;
let subscription=null;
let refreshTimer=null;
let counts=Object.fromEntries(TYPES.map(t=>[t.id,0]));
let statsStatus='';
let demoMode=new URLSearchParams(location.search).has('demo');
const SUBMIT_STORAGE_KEY='chae-ai-animal-counted-v2';
const ROOT=document.getElementById('app');

// XSS 방지: 동물/질문은 고정된 배열이지만 텍스트는 항상 이스케이프.
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function iconPet(t){return `<img src="${img(t.id)}" alt="${esc(t.name)} 캐릭터" loading="lazy">`;}
function scrollTop(){window.scrollTo({top:0,behavior:'instant'});}
function note(message){document.querySelector('.toast')?.remove();const n=document.createElement('div');n.className='toast';n.textContent=message;document.body.appendChild(n);setTimeout(()=>n.remove(),4500);}

function showHome(){cleanupLive();selectedPrimary=null;ROOT.innerHTML=`<section class="content hero">
  <h1>AI를 활용하는 나,<br><span class="accent">어떤 동물과 닮았을까?</span></h1>
  <div class="subtitle">나의 AI 활용 스타일 테스트</div>
  <p class="intro">여섯 동물과 함께, 나만의 AI 활용 방식을 발견해 보세요.<br>AI를 자주 사용해도, 아직 사용해 본 적이 없어도 괜찮아요!<br>각 상황에서 나의 모습과 가장 가까운 선택지를 골라보세요.<br>경험하지 않은 상황이라면 '나라면 어떻게 할까?'를 생각하며 선택하면 됩니다.</p>
  <div class="hero-pets">${TYPES.map(t=>`<div class="hero-pet" style="--pet-bg:${t.light}">${iconPet(t)}<span>${esc(t.name)}</span></div>`).join('')}</div>
  <p class="lead">정답은 없어요!</p>
  <button class="button primary" id="start">테스트 시작하기 →</button>
  <p class="pill-label">약 5~7분 · 총 11문항 · 개인정보 입력 없이</p>
  <p class="disclaimer">이 테스트는 자기성찰을 위한 비공식적인 재미형 테스트이며, 개인의 역량이나 전문성을 평가하는 검사가 아닙니다.</p>
  <button class="button text-btn" id="live-link">함께 보는 결과 ↗</button>
  </section>`;
 document.getElementById('start').onclick=()=>{answers=Array(11).fill(null);current=0;showQuestion();};
 document.getElementById('live-link').onclick=showLiveOnly;
 scrollTop();
}
function showQuestion(){cleanupLive();const q=QUESTIONS[current];const count=QUESTIONS.length;
 ROOT.innerHTML=`<section class="content"><div class="quiz-top"><div class="progress-row"><span>AI 활용 스타일 테스트</span><span>${current+1} / ${count}</span></div><div class="progress-rail" aria-label="진행률 ${Math.round((current+1)/count*100)}%"><div class="progress-fill" style="width:${Math.round((current+1)/count*100)}%"></div></div></div>
 <div class="card question-box"><div class="question-label">Q${current+1}${q.score?' · 상황 속 나의 선택':' · 나의 생각'}</div>
 <h2 class="question-title">${esc(q.q)}</h2>${q.help?`<p class="question-help">${esc(q.help)}</p>`:''}
 <div class="options" role="radiogroup" aria-label="질문 ${current+1} 선택지">${q.options.map((opt,i)=>`<button type="button" class="option ${answers[current]===i?'selected':''}" role="radio" aria-checked="${answers[current]===i?'true':'false'}" data-choice="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(opt)}</span></button>`).join('')}</div></div>
 <div class="quiz-nav"><button class="button secondary" id="back">← ${current?'이전 질문':'처음으로'}</button><button class="button" id="next" ${answers[current]===null?'disabled':''}>${current===count-1?'결과 확인하기 →':'다음 질문 →'}</button></div></section>`;
 ROOT.querySelectorAll('[data-choice]').forEach(btn=>btn.onclick=()=>{answers[current]=Number(btn.dataset.choice);showQuestion();});
 document.getElementById('back').onclick=()=>{if(current===0)showHome();else {current--;showQuestion();}};
 document.getElementById('next').onclick=()=>{if(answers[current]===null)return;if(current===count-1)finishQuiz();else{current++;showQuestion();}};
 scrollTop();
}
function scoreAnswers(list){
 const scores=Object.fromEntries(TYPES.map(t=>[t.id,0]));
 QUESTIONS.forEach((q,i)=>{if(q.score && Number.isInteger(list[i]) && q.score[list[i]]) scores[q.score[list[i]]]++;});
 const max=Math.max(...Object.values(scores));
 return {scores,first:TYPES.filter(t=>scores[t.id]===max).map(t=>t.id)};
}
function secondaryFor(primary,scores){const others=TYPES.filter(t=>t.id!==primary);const max=Math.max(...others.map(t=>scores[t.id]));return others.filter(t=>scores[t.id]===max).map(t=>t.id);}
function finishQuiz(){if(answers.some(a=>a===null)){note('아직 선택하지 않은 문항이 있어요.');return;}const result=scoreAnswers(answers);if(result.first.length>1){showTie(result);}else{selectedPrimary=result.first[0];showResult();}}
function showTie(result){const tied=result.first.map(id=>BY_ID[id]);
 ROOT.innerHTML=`<section class="content tie-intro"><div class="eyebrow">어느 동물이 나와 더 닮았을까?</div><h1>여러 동물의 성향이<br>똑같이 나타났어요!</h1><p class="intro">${tied.length}가지 성향이 동점이에요. 그중 지금의 나와 가장 가까운 대표 동물 하나를 골라 주세요.<br>나머지 성향도 보조 성향으로 다시 계산해요.</p>
 <div class="tie-grid">${tied.map(t=>`<button class="choice-card" data-animal="${t.id}">${iconPet(t)}<span>${t.name}</span></button>`).join('')}</div>
 <button class="button outline" id="tie-back">← 마지막 질문으로</button></section>`;
 ROOT.querySelectorAll('[data-animal]').forEach(btn=>btn.onclick=()=>{selectedPrimary=btn.dataset.animal;showResult();});
 document.getElementById('tie-back').onclick=()=>{current=10;showQuestion();};
 scrollTop();
}
function showResult(){const {scores}=scoreAnswers(answers);const t=BY_ID[selectedPrimary];const second=secondaryFor(selectedPrimary,scores);
 ROOT.innerHTML=`<section class="content result"><div class="result-top"><div class="eyebrow">나의 AI 활용 동물은?</div><div class="mascot-stage" style="--animal-light:${t.light}">${iconPet(t)}</div>
 <h1 class="result-name">${esc(t.name)}</h1><p class="result-quote">“${esc(t.quote)}”</p></div>
 <div class="card result-body"><h2 class="subhead">나의 AI 활용 스타일</h2><ul class="features">${t.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>
 <div class="smallheading">나의 강점</div><p class="body-text">${esc(t.strength)}</p>
 <div class="smallheading">생각해 볼 점</div><p class="body-text">${esc(t.thought)}</p>
 <div class="smallheading">나에게는 이런 성향도 있어요!</div>
 <div class="secondary-traits">${second.map(id=>`<span class="trait-chip" style="--pet-bg:${BY_ID[id].light}">${iconPet(BY_ID[id])}<span>${esc(BY_ID[id].name)}</span></span>`).join('')}</div>
 <p class="body-text">${second.length>1?'보조 성향이 동점으로 나타났어요. 모두 같은 비중으로 살펴봐 주세요.':'대표 성향 외에도 또 다른 활용 관점이 함께 나타났어요.'}</p>
 </div><div class="reflection"><strong>어떤 동물이 나왔든 괜찮아요!</strong><p>AI를 활용하는 방식은 서로 달라도 괜찮아요. 중요한 것은 얼마나 자주 사용하는지가 아니라, 언제·왜·어떻게 활용할지 판단하는 것입니다.</p></div>
 <div class="actions"><button class="button" id="share-result">결과 공유하기 ↗</button><button class="button secondary" id="save-image">결과 이미지 저장하기 ↓</button><button class="button outline" id="copy-result-link">결과 링크 복사 🔗</button><button class="button secondary" id="retest">다시 검사하기 ↺</button></div>
 <p class="result-share-tip">결과를 공유하면 내 동물 유형을 친구들에게 보여줄 수 있어요. 모바일에서는 결과 이미지를 직접 공유할 수도 있어요.</p>
 <div class="submission-status" id="submission-status" role="status" aria-live="polite">전체 결과 반영 상태를 확인하고 있어요.</div>
 <div class="result-disclaimer">이 결과는 재미와 자기성찰을 위한 비공식 유형 테스트입니다.<br>개인의 AI 리터러시나 교사 전문성을 평가한 결과가 아닙니다.</div>
 <div id="collective-slot"></div></section>`;
 document.getElementById('share-result').onclick=()=>shareResult(t,second);
 document.getElementById('copy-result-link').onclick=()=>copyResultLink(t); 
 document.getElementById('save-image').onclick=()=>saveResultImage(t,second);
 document.getElementById('retest').onclick=()=>{answers=Array(11).fill(null);selectedPrimary=null;current=0;showHome();};
 document.getElementById('collective-slot').innerHTML=renderCollective(false);
 initLive(); registerResultOnce(selectedPrimary);
 scrollTop();
}
function renderCollective(standalone){
 const total=TYPES.reduce((sum,t)=>sum+(counts[t.id]||0),0);
 const leaderCount=Math.max(0,...TYPES.map(t=>counts[t.id]||0));
 // 같은 유형의 결과가 증가하면 다른 유형 수와 상관없이 비눗방울이 점점 커집니다.
 return `<section class="collective ${standalone?'live-only':''}" aria-label="전체 참여자 결과 분포"><div class="collective-head"><h2>우리의 AI 동물 비눗방울 🫧</h2>${connected && !demoMode?'<span class="live-pill">실시간 집계</span>':''}</div>
 <div class="status-line" id="status-line">${esc(statsStatus)}</div>
 <div class="bubbles" id="bubble-board">${TYPES.map((t,i)=>{const c=counts[t.id]||0;const size=54+Math.round(100*(1-Math.exp(-c/12)));return `<div class="bubble-cell ${total>0&&c===leaderCount?'is-leader':''}"><div class="bubble" style="--bubble-tint:${t.tint};--bubble-size:${size}px;--float-dur:${3.2+i*.39}s" aria-label="${esc(t.name)} ${c}개 결과">${iconPet(t)}<span class="bubble-number">${c}개</span></div><div class="bubble-caption">${esc(t.name)}</div></div>`;}).join('')}</div>
 <div class="total-line">총 <span id="grand-total">${total}</span>개의 결과가 모였어요</div>
 <div class="stat-grid" id="stat-grid">${TYPES.map(t=>{const c=counts[t.id]||0;const pct=total?Math.round(c/total*100):0;return `<div class="stat-row"><div class="stat-name">${esc(t.name)}</div><div class="stat-track"><div class="stat-fill" style="--bar-color:${t.bar};width:${pct}%"></div></div><div class="stat-amount">${c}개 · ${pct}%</div></div>`;}).join('')}</div>
 <p class="privacy-note">이름, 연락처, 개별 문항 응답은 수집하지 않아요. 대표 동물별 누적 결과 수만 집계해요.</p>
 ${standalone?'<div class="actions"><button class="button secondary" id="live-home">처음으로 돌아가기 ←</button></div>':'<div class="actions"><button class="button outline small" id="large-live">전체 화면으로 크게 보기 ↗</button></div>'}</section>`;
}
function showLiveOnly(){cleanupLive();ROOT.innerHTML=`<div class="content separate-live"><div id="collective-slot">${renderCollective(true)}</div></div>`;document.getElementById('live-home').onclick=showHome;initLive();scrollTop();}
function refreshCollective(){const slot=document.getElementById('collective-slot');if(!slot)return;const standalone=!!document.getElementById('live-home');slot.innerHTML=renderCollective(standalone);if(standalone)document.getElementById('live-home').onclick=showHome;else document.getElementById('large-live').onclick=showLiveOnly;}

// ===================== Supabase: 익명 집계만 저장 / 실시간 조회 =====================
// 브라우저에 공개 가능한 publishable key는 'apikey' 헤더에만 전달합니다.
// 개인 식별 정보나 문항별 응답은 Supabase에 전송하지 않습니다.
const CONFIG=window.ANIMAL_APP_CONFIG||{};
const connected=!!(CONFIG.supabaseUrl&&CONFIG.supabasePublishableKey);
const API_BASE=connected?CONFIG.supabaseUrl.replace(/\/$/,'')+'/rest/v1':'';
const API_HEADERS=connected?{'apikey':CONFIG.supabasePublishableKey}:{};
function ensureClient(){
 if(!connected||!window.supabase?.createClient)return null;
 if(!client)client=window.supabase.createClient(CONFIG.supabaseUrl,CONFIG.supabasePublishableKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
 return client;
}
function setSubmitStatus(message,kind=''){
 const el=document.getElementById('submission-status');
 if(el){el.textContent=message;el.dataset.kind=kind;}
}
async function apiRequest(path,options={}){
 if(!connected)throw new Error('설정에 프로젝트 URL 또는 공개용 키가 없습니다.');
 const response=await fetch(API_BASE+path,{
  method:options.method||'GET',
  headers:{...API_HEADERS,...(options.body?{'Content-Type':'application/json'}:{}),...(options.headers||{})},
  ...(options.body?{body:JSON.stringify(options.body)}:{})
 });
 if(!response.ok){
   let detail='';
   try{const data=await response.json();detail=String(data?.message||data?.hint||data?.code||'');}catch(_){}
   const err=new Error('HTTP '+response.status+(detail?' · '+detail:''));
   err.status=response.status;
   throw err;
 }
 return options.method==='POST'?null:response.json();
}
function cleanupLive(){
 if(refreshTimer)clearInterval(refreshTimer);refreshTimer=null;
 if(subscription&&client){client.removeChannel(subscription);subscription=null;}
}
async function getCounts(){
 if(demoMode){
  counts={squirrel:3,beaver:12,otter:8,owl:5,hedgehog:4,rabbit:2};
  statsStatus='시연용 숫자입니다. 실제 결과가 아니에요.';
  refreshCollective();return;
 }
 if(!connected){
  statsStatus='';refreshCollective();return;
 }
 try{
  const data=await apiRequest('/animal_counts?select=animal,total');
  const next=Object.fromEntries(TYPES.map(t=>[t.id,0]));
  for(const row of data||[]){
    if(Object.hasOwn(next,row.animal))next[row.animal]=Math.max(0,Number(row.total)||0);
  }
  counts=next;statsStatus='';refreshCollective();
 }catch(error){
  console.error('animal_counts read failed',error);
  statsStatus='전체 집계를 불러오지 못했어요. 관리자에게 문의해 주세요.';
  refreshCollective();
 }
}
function initLive(){
 cleanupLive();
 getCounts();
 if(!connected||demoMode)return;
 // 가능하면 변경 이벤트 즉시 반영, 연결하지 못해도 아래 주기적 갱신은 유지합니다.
 try{
  const db=ensureClient();
  if(db)subscription=db.channel('animal-counts-live')
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:'animal_counts'},()=>getCounts())
    .subscribe();
 }catch(error){console.warn('realtime subscription unavailable, using polling',error);}
 refreshTimer=setInterval(getCounts,5000);
}
async function registerResultOnce(primary){
 if(demoMode){setSubmitStatus('시연 모드에서는 실제 결과가 집계되지 않아요.');return;}
 if(localStorage.getItem(SUBMIT_STORAGE_KEY)){
  setSubmitStatus('이 기기에서 이미 결과를 제출했어요. 다시 검사해도 통계에는 중복 반영되지 않아요.','already');
  return;
 }
 if(!connected){
  setSubmitStatus('통계 서버 연결 정보가 아직 설정되지 않았어요.','error');return;
 }
 if(isSubmitting)return;
 isSubmitting=true;
 setSubmitStatus('내 결과를 전체 통계에 반영하는 중이에요.');
 try{
  await apiRequest('/rpc/record_animal',{method:'POST',body:{p_animal:primary}});
  localStorage.setItem(SUBMIT_STORAGE_KEY,'1');
  setSubmitStatus('내 동물 유형 1개가 전체 결과에 반영됐어요!','success');
  // 저장 성공과 화면 새로고침 실패를 구분해 잘못된 저장 실패 메시지를 방지합니다.
  try{await getCounts();}catch(refreshError){console.warn('Saved successfully, but count refresh failed',refreshError);}
 }catch(error){
  console.error('animal_counts submission failed',error);
  setSubmitStatus('결과는 확인할 수 있지만 전체 통계 저장에 실패했어요. ('+String(error.message).slice(0,130)+')','error');
 }finally{isSubmitting=false;}
}

// ===================== 실제 PNG 이미지 / 결과별 링크 공유 =====================
const SHARE_BASE='https://hyein1221.github.io/ai-animal-test/';
function resultShareUrl(t){return SHARE_BASE+'share/'+encodeURIComponent(t.id)+'.html';}
function resultShareText(t){return '나의 AI 활용 스타일은 '+t.name+'! 당신은 어떤 동물과 닮았을까요?';}
async function copyText(text){
 try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return true;}}
 catch(error){console.warn('Clipboard API failed; trying fallback',error);}
 try{
  const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.left='-9999px';
  document.body.appendChild(field);field.select();
  const copied=document.execCommand('copy');field.remove();return copied;
 }catch(error){console.warn('Fallback clipboard failed',error);return false;}
}
async function copyResultLink(t){
 const link=resultShareUrl(t);
 if(await copyText(link))note('내 동물 결과 링크를 복사했어요! 카카오톡에 붙여넣어 공유해 보세요.');
 else {note('링크 복사가 지원되지 않아요. 아래 공유 링크를 눌러 복사해 주세요.');}
}
async function shareResult(t,other){
 const url=resultShareUrl(t);
 const title=t.name+' | AI를 활용하는 나, 어떤 동물과 닮았을까?';
 const text=resultShareText(t);
 if(navigator.share && navigator.canShare && typeof File==='function'){
  try{
   const blob=await makeResultImage(t,other);
   const file=new File([blob],'AI_활용_결과_'+t.short+'.png',{type:'image/png'});
   if(navigator.canShare({files:[file]})){
    // 파일 공유가 가능한 휴대폰에서는 결과 카드 PNG 자체를 첨부하고, 링크도 메시지에 담습니다.
    await navigator.share({files:[file],title,text:text+'\n'+url});
    return;
   }
  }catch(error){
   if(error?.name==='AbortError')return;
   console.warn('Image share unavailable; falling back to result link',error);
  }
 }
 if(navigator.share){
  try{await navigator.share({title,text,url});return;}
  catch(error){if(error?.name==='AbortError')return;console.warn('Native link share unavailable',error);}
 }
 if(await copyText(url))note('내 동물 결과 링크를 복사했어요! 메신저에 붙여넣어 공유해 보세요.');
 else note('결과 링크: '+url);
}
async function makeResultImage(t,other){
 if(document.fonts?.ready)await document.fonts.ready;
 const cv=document.createElement('canvas');cv.width=1080;cv.height=1350;const ctx=cv.getContext('2d');
 ctx.fillStyle='#F7F6F5';ctx.fillRect(0,0,1080,1350);
 const rect=(x,y,w,h,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();};
 rect(55,55,970,1240,46,'#FFFDFC');rect(88,88,904,22,10,t.bar);
 ctx.textAlign='center';ctx.fillStyle='#9C735D';ctx.font='bold 28px sans-serif';ctx.fillText('AI를 활용하는 나, 어떤 동물과 닮았을까?',540,172,900);
 ctx.font='bold 35px sans-serif';ctx.fillStyle='#806C63';ctx.fillText('나의 AI 활용 동물은?',540,241);
 const image=new Image();image.src=img(t.id);await new Promise((resolve,reject)=>{if(image.complete&&image.naturalWidth)resolve();else {image.onload=resolve;image.onerror=reject;}});
 const box={x:270,y:265,w:540,h:545};
 const ratio=Math.min(box.w/image.width,box.h/image.height);
 ctx.drawImage(image,box.x+(box.w-image.width*ratio)/2,box.y+(box.h-image.height*ratio)/2,image.width*ratio,image.height*ratio);
 ctx.fillStyle='#493C3C';ctx.font='bold 60px sans-serif';ctx.fillText(t.name,540,865);
 ctx.font='bold 31px sans-serif';ctx.fillStyle='#9A735E';wrapCanvas(ctx,'“'+t.quote+'”',540,930,870,40);
 rect(140,1004,800,100,25,t.light);ctx.font='bold 27px sans-serif';ctx.fillStyle='#5C514C';
 ctx.fillText('나의 강점  ·  '+t.strength,540,1065);
 ctx.font='bold 25px sans-serif';ctx.fillStyle='#665C56';ctx.fillText('보조 성향: '+other.map(id=>BY_ID[id].short).join(' · '),540,1170);
 ctx.font='22px sans-serif';ctx.fillStyle='#877F7B';ctx.fillText('정답 없는, 우리만의 AI 활용 이야기',540,1242);
 const blob=await new Promise(resolve=>cv.toBlob(resolve,'image/png'));
 if(!blob)throw new Error('png export failed');
 return blob;
}
async function saveResultImage(t,other){
 try{
  const blob=await makeResultImage(t,other);
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='나의_AI_활용_동물_'+t.short+'.png';
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  note('PNG 저장을 요청했어요. 모바일에서 자동 저장되지 않으면 다운로드 폴더 또는 브라우저의 저장 메뉴를 확인해 주세요.');
 }catch(error){console.error('image save',error);note('이미지를 만들지 못했어요. 이미지 파일이 모두 업로드됐는지 확인해 주세요.');}
}
function wrapCanvas(ctx,text,x,y,maxWidth,lineHeight){let line='';for(const c of Array.from(text)){const tryLine=line+c;if(ctx.measureText(tryLine).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;line=c;}else{line=tryLine;}}if(line)ctx.fillText(line,x,y);}

// 테스트용: 로컬 JS 환경에서 점수 검증 시 접근 가능. 실제 참여자에게 노출되는 개인정보는 없음.
window.AnimalTest={TYPES,QUESTIONS,scoreAnswers,secondaryFor};
if(new URLSearchParams(location.search).get('view')==='live')showLiveOnly();else showHome();