(() => {
  const init = () => {
    if (!document.body.classList.contains('todaiji-page') || document.querySelector('#deep-stations')) return;

    if (!document.querySelector('link[href*="todaiji-deep-stations.css"]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'assets/todaiji-deep-stations.css?v=20260724-1';
      document.head.appendChild(style);
    }

    const summaries = document.querySelector('#stops');
    if (!summaries) return;
    const summaryHeading = summaries.querySelector('.section-heading');
    if (summaryHeading) {
      const label = summaryHeading.querySelector('.label');
      const title = summaryHeading.querySelector('h2');
      const intro = summaryHeading.querySelector('p');
      if (label) label.textContent = 'Field summaries';
      if (title) title.textContent = '現場摘要：到場後只保留關鍵觀察';
      if (intro) intro.textContent = '以下短章適合站在建築或佛像前快速重看；完整背景、史料界線與觀看推理已放在上方逐站深讀。';
    }

    const section = document.createElement('section');
    section.className = 'section deep-stations-section';
    section.id = 'deep-stations';
    section.innerHTML = `
      <div class="wrap">
        <div class="section-heading deep-stations-heading">
          <div class="label">Museum-grade pre-reading</div>
          <div>
            <h2>逐站深讀：事前讀完，現場把時間留給原物</h2>
            <p>這一層負責取代館內大部分歷史標籤、名詞解釋與作品背景。每章先交代「為何存在」，再處理材料、空間、觀看次序與常見誤讀；現場仍需親自判斷表面、體量、暗光、聲音與人流。</p>
          </div>
        </div>
        <nav class="deep-stations-nav" aria-label="逐站深讀捷徑">
          <a href="#deep-museum">01 ミュージアム</a>
          <a href="#deep-nandaimon">02 南大門</a>
          <a href="#deep-daibutsuden">03 大佛殿</a>
          <a href="#deep-hokkedo">04 法華堂</a>
          <a href="#deep-nigatsudo">05 二月堂</a>
          <a href="#deep-synthesis">06 串連五站</a>
        </nav>

        <article class="deep-station" id="deep-museum" data-deep-station>
          <aside class="deep-station-aside">
            <span class="deep-station-number">01</span>
            <time>14:00–14:30</time>
            <h3>東大寺ミュージアム</h3>
            <p class="deep-question">主問題：寺寶離開原來殿堂後，館舍保存了甚麼，又抽走了甚麼？</p>
            <figure><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/%E3%80%8EJapanese%20Temples%20and%20Their%20Treasures%E3%80%8F%E3%80%8A%E4%BC%9D%E6%9C%88%E5%85%89%E8%8F%A9%E8%96%A9%E5%83%8F%E3%80%8B8%E4%B8%96%E7%B4%80%E3%80%81%E5%A5%88%E8%89%AF%E6%99%82%E4%BB%A3%E3%80%81%E6%9D%B1%E5%A4%A7%E5%AF%BA%E3%80%81%E5%A5%88%E8%89%AF.jpg?width=900" alt="東大寺傳月光菩薩立像歷史圖像" loading="lazy"><figcaption>傳月光菩薩歷史圖像；點圖可開完整檔及權利資料。</figcaption></figure>
          </aside>
          <div class="deep-station-body">
            <section><h4>館舍本身就是近代保存史</h4><p>東大寺在兵火、地震、火災與長期宗教使用之中多次失去建築和造像。2011年開館的ミュージアム，目的並非把寺院變成一般美術館，而是為雕塑、繪畫、工藝、經卷與古文書提供一個能夠保存、研究和輪換公開的環境。五個展示室與收蔵庫採用房間免震，尤其照顧泥塑一類質量大、脆弱、受震時容易沿接合層碎裂的作品。第二展示室刻意參照法華堂內陣的氣氛，提醒觀眾：這些像原來屬於群像與禮拜秩序，並非各自獨立的展櫃明星。</p><p>這種安排同時帶來取捨。館內照明讓你靠近看眼皮、指尖、殘彩與修補；乾燥、穩定、免震的環境延長作品壽命。離開原殿堂後，香氣、誦經、昏暗、固定朝拜方向、像與建築的比例關係會被削弱。你入館時要有意識地把「看清楚」和「原來如何被使用」分開處理。</p></section>
            <section><h4>常設寺寶應如何分組，而非逐件背名</h4><p>第一組是法華堂傳來的泥塑：傳日光、傳月光菩薩。傳統名稱沿用已久，近代研究亦曾重新討論其原始身分。重要之處不在於急於選定一個答案，而在於比較兩像的臉形、合掌高度、肩腰重心與衣褶節奏。泥塑由木骨、草繩、粗泥和細泥逐層建立，表面可以形成木雕較難達到的柔軟過渡；修補、裂縫和殘彩亦會直接暴露材料的脆弱。</p><p>第二組是小型金銅佛與儀式器具，例如誕生釋迦佛和灌佛盤。誕生佛的指天指地手勢、盤的尺寸與周邊裝飾，都源自佛誕日灌佛會的實際操作。把它只看成精緻小雕像，會忽略香水由頭頂澆下、落入盤中、被反覆使用的宗教功能。第三組是木造千手觀音。多臂並非純粹追求奇觀，而是用有限的可見手臂表達無限救濟能力；現場要看主臂和次臂如何形成層級，以及不同木件、金層和後代修理如何被整合成一個正面形象。</p></section>
            <section><h4>30分鐘應該花在哪裡</h4><p>入口歷史影像只需抓住四個節點：天平創建、1180年南都燒討、鎌倉重建、江戶再興。你已在本頁讀過背景，館內毋須再逐字抄年表。先用約十分鐘比較千手觀音的木構和多臂層級；再用十二分鐘看日光、月光的泥塑表面與不對稱；最後八分鐘選誕生佛或當期輪換展品。8月24日為換展休館，27日雖按現公告開館，輪換後確實展品仍應在8月25至26日重查新目錄。</p><p>館內禁止攝影、寫生和使用電筒。這反而有助你集中：先退後看整體輪廓，再靠近看材料，再移到側面判斷厚度與重心。離館時你應帶走三件事：泥、木、漆、銅各有不同的重量與表面；法華堂群像曾被重新配置；博物館保護了作品，寺院本體則保留了作品原本參與的空間和儀式。</p></section>
            <div class="deep-takeaway"><strong>到場任務</strong><span>少讀標籤，多比較材料；至少把一件作品從正面、側面和近距離看三次。</span></div>
            <p class="deep-sources"><a href="https://www.todaiji.or.jp/information/museum/" target="_blank" rel="noopener">東大寺：館舍、五室與常設寺寶 ↗</a> · <a href="#object-room">本頁文物逐件導讀</a></p>
          </div>
        </article>

        <article class="deep-station" id="deep-nandaimon" data-deep-station>
          <aside class="deep-station-aside">
            <span class="deep-station-number">02</span>
            <time>14:30–14:42</time>
            <h3>南大門</h3>
            <p class="deep-question">主問題：一座門如何同時顯示鎌倉復興的工程制度與慶派工房的集體生產？</p>
            <figure><img src="assets/images/todaiji/nandaimon-structure.webp" alt="南大門內部柱與貫材結構" loading="lazy"><figcaption>先讀結構，再看仁王；點圖開完整原圖。</figcaption></figure>
          </aside>
          <div class="deep-station-body">
            <section><h4>它是1180年災難之後的復興宣言</h4><p>天平時代南大門在平安時代因大風倒塌。今日所見的門屬鎌倉重建：1199年上棟，1203年連同門內兩尊金剛力士完成。它接近重源復興工程的尾聲，作用遠超過提供出入口。1180年平重衡南都燒討摧毀大佛殿及大量伽藍，重源必須同時處理募緣、木材供應、運輸、鑄造、工匠調度和政治支持。南大門把這套重新組織起來的能力直接做成一個巨大門面，亦保留了已不存在的鎌倉大佛殿所使用的大佛樣建築語言。</p><p>門高25.46米，十八條大圓柱伸至屋架，柱長19.058米。外觀像兩層，內部下層沒有一般樓板，視線可直達屋頂。水平貫材穿過柱身，把高柱聯結成一個能承受巨大屋頂和側向力的框架。大佛樣的關鍵不在「像中國」這個模糊印象，而在結構外露、粗大構件、穿柱貫材與施工效率。站在門內向上望，你看到的每個節點都在回答：怎樣用有限時間和大量材料重建國家級尺度。</p></section>
            <section><h4>兩尊仁王是工房工程，亦是低光劇場</h4><p>阿形和吽形像高各約8.4米，1203年由運慶、快慶、定覺、湛慶及眾多工匠並行製作，造像期僅69日。這個速度依賴寄木、分工、同時施工與門旁現場組裝。1988至1993年的解體修理在胎內發現經卷、墨書、工匠名與施工資料，進一步證明兩像不是「一位天才單獨完成」，而是有大佛師統籌、不同組別協作的成熟生產系統。用「運慶作品」一句帶過，會遮蔽真正值得看的組織技術。</p><p>仁王像亦按門內條件設計。龕深、光線低、觀者在下方移動，表情和肌肉要在遠距離及仰視中仍然清楚。正面看會先讀到怒目、開口或閉口、武器和外張輪廓；移到側面，胸腹扭轉、臀腿支撐和衣帶飛動才會成立。近看木塊接合與深鑿陰影，可以理解雕刻如何把分散木件統合成一個似乎即將踏出龕外的身體。</p></section>
            <section><h4>現場次序與常見誤讀</h4><p>先站在門南側稍遠位置看整座門與人流比例；進入門內中央後仰望通高空間，辨認貫材穿柱和沒有樓板的腰屋根結構；最後才分別走到阿形和吽形側面。不要急於比較「哪尊較靚」，先問兩尊如何隔門相向、如何把通道變成受保護的邊界。亦不要把肌肉寫實理解成西方式解剖展示；它服務的是護法威勢、遠距辨識和移動觀者的視覺衝擊。</p><p>十二分鐘足夠完成這套次序，前提是不要在門口中央停下拍團體照。離開時回頭看一次：門、仁王、遊客和通往大佛殿的中軸共同形成由城市空間進入寺域的壓力。下一站大佛殿會把同一套鎌倉復興工程，從門與木雕擴展到更巨大的建築和銅佛。</p></section>
            <div class="deep-takeaway"><strong>到場任務</strong><span>先找穿柱貫材，再由吽形側面找木塊接合；不要只拍正面。</span></div>
            <p class="deep-sources"><a href="https://www.todaiji.or.jp/information/nandaimon/" target="_blank" rel="noopener">東大寺：南大門與仁王修理發現 ↗</a></p>
          </div>
        </article>

        <article class="deep-station" id="deep-daibutsuden" data-deep-station>
          <aside class="deep-station-aside">
            <span class="deep-station-number">03</span>
            <time>14:50–15:25</time>
            <h3>大佛殿</h3>
            <p class="deep-question">主問題：一尊宇宙佛如何同時成為國家工程、材料史與反覆修補的共同體記憶？</p>
            <figure><img src="assets/images/todaiji/daibutsu.webp" alt="東大寺盧舍那大佛殿內側面" loading="lazy"><figcaption>由正面移到側面，巨像才由圖案變成有厚度的物體。</figcaption></figure>
          </aside>
          <div class="deep-station-body">
            <section><h4>先把「大」理解成一套政治與宗教語言</h4><p>743年聖武天皇頒布盧舍那大佛造立詔，749年佛身完成鑄造，752年舉行開眼供養。東大寺同時是大和國國分寺、祈願天下泰平與萬民豐樂的道場，也是研究華嚴等多宗教理、培養學僧的學問寺。巨佛並非單純炫耀權力；它把疫情、叛亂、災害與政治不安轉化成一個全國參與、眾人結緣的宗教工程。這種理想亦有物質代價：銅、木、燃料、鑄造技術、運輸、工匠與大量勞動被集中到一個項目。</p><p>現殿是1709年江戶再興的成果。大佛殿在1180年和1567年兩度焚毀；現建築正面57.012米、南北50.480米、高48.742米。創建及鎌倉重建大殿皆為十一間、正面約88米，江戶重建因資金和材料限制縮為七間，但高度與深度大致延續。現殿的巨大感與正面收窄可以同時成立：你面前是一座縮小後仍極其巨大的續命工程。</p></section>
            <section><h4>盧舍那佛不是放大的釋迦肖像</h4><p>大佛正式名為盧舍那佛或毘盧遮那佛，意指智慧與慈悲的光明遍照。佛身高約14.98米，面長5.33米、眼長1.02米、耳長2.54米。華嚴經所描述的佛超越單一時間和地點；鳥聲、花色、水流與雲形皆可被理解為其說法。巨像的尺度因此不是把普通人體等比例放大，而是令觀者在身體上感到自己置身更廣大的法界。</p><p>蓮座花瓣線刻「蓮華藏世界」把同一觀念壓縮到微觀圖像：佛、菩薩、眾生和無數世界層層相連。先被十五米佛身壓倒，再俯身尋找蓮瓣細線，正是華嚴由「一」展開「多」、又在「多」中重見整體的觀看操作。只拍佛面會錯過這個由宏觀建築到微觀線刻的尺度轉換。</p></section>
            <section><h4>銅佛的原真性存在於接鑄與修補</h4><p>巨佛以內外土模留下銅壁空間，再由下而上分段澆鑄。地震、火災、戰亂和重建令佛身多次受損及補鑄，今日所見包含不同年代的金屬與修理。這類作品很難用「八世紀原件百分比」判斷價值；更有意義的是辨認一尊佛如何在歷代共同體投入資源後繼續存在。側面和背後較容易看到厚度、接縫、表面顏色與比例差異，這些不整齊之處就是保存史。</p><p>進殿前先看八角銅燈籠。它屬創建期遺物，火袋四面為音聲菩薩、四面為雲中獅子，柱身銘文讚頌燃燈功德。燈籠把光、音樂和供養帶到大殿門前；看完它再進入暗殿，會更容易理解大佛殿並非只有一尊大像，而是由光、聲、香、行列和供養組成的宗教空間。</p></section>
            <section><h4>35分鐘觀看線</h4><p>第一段在中門外：把殿與人群放在同一畫面，記住現殿正面約為古代六成半。第二段入殿停在中軸，等眼睛適應明暗，先感受佛如何佔據建築。第三段移到側面，看身體厚度、手掌、脇侍、修補與結構。第四段回到蓮座找世界圖。最後回望入口，觀察你由遠至近的路徑如何被建築安排。</p><p>常見誤讀包括：把大佛視為「世界最大」排行榜項目；把現殿縮小理解成失敗；把修補視為不純；把華嚴世界圖當成裝飾。較好的理解是：尺度服務教義，縮小反映江戶共同體的可完成選擇，修補顯示延續，線刻把巨佛的宇宙觀落到細節。</p></section>
            <div class="deep-takeaway"><strong>到場任務</strong><span>門外看殿、正面看佛、側面看修補、低頭看蓮瓣；完成四個尺度。</span></div>
            <p class="deep-sources"><a href="https://www.todaiji.or.jp/information/daibutsuden/" target="_blank" rel="noopener">東大寺：大佛殿、盧舍那佛與八角燈籠 ↗</a> · <a href="https://www.todaiji.or.jp/history/" target="_blank" rel="noopener">東大寺：創建與重建史 ↗</a></p>
          </div>
        </article>

        <article class="deep-station" id="deep-hokkedo" data-deep-station>
          <aside class="deep-station-aside">
            <span class="deep-station-number">04</span>
            <time>15:35–15:55</time>
            <h3>法華堂（三月堂）</h3>
            <p class="deep-question">主問題：怎樣在一座堂內同時讀到奈良時代造像群、鎌倉重建和近代移座？</p>
            <figure><img src="assets/images/todaiji/hokkedo.webp" alt="東大寺法華堂外觀" loading="lazy"><figcaption>後方正堂與前方禮堂來自不同時代，今日被接成一座堂。</figcaption></figure>
          </aside>
          <div class="deep-station-body">
            <section><h4>建築本身是兩個時代的接縫</h4><p>法華堂源自東大寺前身金鍾山寺，被視為寺內現存最古建築之一。後方正堂約建於747年前後，屬奈良時代；前方禮堂在1199年由重源重建。早期可能是正堂與禮堂分開的雙堂形式，後來把兩者屋頂接合，形成今日複雜外觀。正堂較簡潔，禮堂則在和樣中加入大佛樣手法。你由外向內走，其實跨過天平創建與鎌倉復興的實體接縫。</p><p>「三月堂」名稱來自每年三月舉行法華會；更早因本尊為不空羂索觀音而稱羂索堂。名稱變化反映堂宇功能和法會記憶，不能只當作同一建築的三個旅遊稱呼。它亦相傳是華嚴經在日本首次講授的地方之一，連結東大寺早期教學與造像活動。</p></section>
            <section><h4>本尊要連同整個壇場觀看</h4><p>不空羂索觀音像高約362厘米，三眼八臂。「不空」指救濟不落空，「羂索」是能繫引眾生的索。多眼多臂用可見形體表達超越常人的視野與行動能力。像以脫活乾漆製成：先塑泥胎，貼麻布並反覆髹漆，硬化後除去泥心，再以木構補強。成品比實心泥塑輕，曲面連續，亦可承載細密裝飾；代價是材料昂貴、工序漫長、表層對環境和修理極敏感。</p><p>高大的銀製寶冠嵌有大量珠玉。暗光下不會形成均勻金光，而是隨觀者移動出現碎亮。這種效果與殿內距離、方向和照明共同成立，網頁照片容易把它壓成平面裝飾。到場先看整個剪影和群像站位，再尋找第三眼、八臂、羂索、鹿皮與寶冠反光。</p></section>
            <section><h4>群像不是一排國寶清單</h4><p>梵天、帝釋天、金剛力士、四天王等護法以高度、方向、武器和目光包圍本尊，建立一個有秩序的壇場。部分作品用脫活乾漆，部分用泥塑或木造；材料差異會改變表面、重量、姿勢和保存狀態。傳日光、月光菩薩等泥塑已移入ミュージアム，令現場群像和歷史配置之間出現缺口。這個缺口本身值得注意：近代保存把脆弱作品移到免震館舍，同時改變了原空間的視覺關係。</p><p>不要在二十分鐘內逐尊讀名牌。先退後讀本尊與護法形成的整體，再選一尊比較材料：乾漆曲面較連續，泥塑眼皮和面頰過渡較柔軟，木造較容易看出接合和刀痕。最後回到建築，辨認正堂與禮堂的空間差異。這樣可把造像、儀式和重建史放在同一個觀察框架。</p></section>
            <section><h4>史料界線與現場限制</h4><p>法華堂群像在歷史上曾有移動、增減和身分解釋變化。某些「原來站位」屬研究重構，應以可能性而非絕對復原看待。執金剛神為秘佛，每年12月16日才開扉，8月27日不會見到。堂內禁止攝影、寫生和使用電筒；你無法靠相機記錄，最好在入堂前先決定兩個問題，離堂後立即記下答案。</p><p>法華堂16:00關門。15:55前離堂的安排十分緊，現場應放棄逐件看完的衝動。真正目標是看清三個關係：奈良正堂與鎌倉禮堂如何連接；本尊與護法如何形成壇場；不同材料如何在暗光中呈現不同表面。</p></section>
            <div class="deep-takeaway"><strong>到場任務</strong><span>先看兩時代建築接縫，再看本尊與群像整體，最後只比較一組材料。</span></div>
            <p class="deep-sources"><a href="https://www.todaiji.or.jp/information/hokkedo/" target="_blank" rel="noopener">東大寺：法華堂歷史與建築 ↗</a> · <a href="https://kunishitei.bunka.go.jp/heritage/detail/102/2436" target="_blank" rel="noopener">文化庁：法華堂建築資料 ↗</a> · <a href="https://online.bunka.go.jp/db/heritages/detail/125587" target="_blank" rel="noopener">文化庁：不空羂索觀音作品資料 ↗</a></p>
          </div>
        </article>

        <article class="deep-station" id="deep-nigatsudo" data-deep-station>
          <aside class="deep-station-aside">
            <span class="deep-station-number">05</span>
            <time>15:55–16:30</time>
            <h3>二月堂</h3>
            <p class="deep-question">主問題：一座建築怎樣被延續一千二百多年的行法逐步塑造成專用儀式機器？</p>
            <figure><img src="assets/images/todaiji/nigatsudo.webp" alt="東大寺二月堂舞台與坡地木構" loading="lazy"><figcaption>舞台、樓梯、局與坡地支撐要連同修二會動線理解。</figcaption></figure>
          </aside>
          <div class="deep-station-body">
            <section><h4>修二會的核心是悔過，不只是火把奇觀</h4><p>修二會由實忠在752年創始，正式名稱是十一面悔過法。練行眾在本尊十一面觀音前代眾生懺悔過失，祈求鎮護國家、天下泰安、風雨順時、五穀豐穰與萬民安樂。古代把疫病、天災和反亂視為國家的疾病，悔過法會因而兼有宗教修行和公共秩序的意義。2026年為第1,275次，東大寺即使兩度失去大部分伽藍，修二會仍以臨時空間或復建堂宇延續，故稱「不退の行法」。</p><p>旅遊宣傳常把修二會縮成お松明或お水取り。火把原是練行眾夜間登堂的道明；取水則在3月12日深夜至13日凌晨，由若狹井汲取供奉觀音的香水。聲明、行道、懺悔、名冊、供物、火與水共同構成兩星期行法。理解這些關係，八月站在空堂前才不會只看到一個觀景台。</p></section>
            <section><h4>建築隨儀式增長</h4><p>二月堂名稱來自舊曆二月舉行修二會。早期建築據稱較小，隨行法規模和程序增加，內陣、外陣、禮堂、局、樓梯和舞台逐步形成。1667年修二會期間堂內失火，現堂於1669年重建。寺方特別指出，它的間取り和音響效果非常適合行法；建築價值因此不只在年代或外觀，而在長期使用如何反過來塑造空間。</p><p>「局」提供聽聞與分隔；樓梯控制練行眾和參拜者的出入；舞台及下方木構適應坡地，亦形成火把、奔走和聲音傳播的場景。內外陣之間的距離、木板和天井影響多僧合聲與腳步回響。這是一座由程序推導空間的建築，和大佛殿以巨像建立中心的方式不同。</p></section>
            <section><h4>八月如何閱讀一個沒有法會的法會空間</h4><p>先由側面看舞台如何懸出坡地，再找樓梯和局的位置，想像練行眾、火把與聽眾的不同路線。踏上舞台後，不要只朝奈良盆地拍照；回身看本堂與舞台的連接，感受視線如何由城市景觀轉回觀音道場。若環境安靜，可以留意木板腳步、風聲和人聲反射，這些都是修二會聲學的平日殘影。</p><p>本尊十一面觀音屬絕對秘佛，無人可直接觀看。這點改變了「看佛像」的習慣：信仰中心可以由不可見本尊、行法、聲音、名冊和反覆履行的誓約共同維持。二月堂因此最能說明東大寺的延續並不完全依靠保存一件可見原物。</p></section>
            <section><h4>離開東大寺前應帶走甚麼</h4><p>南大門顯示鎌倉工房和大佛樣工程；大佛殿把華嚴教義變成國家尺度；法華堂保存天平群像並暴露移座與材料問題；二月堂把歷史壓進每年重複的行法。站在舞台時把這四條線重新連起來，東大寺才會由「很多國寶」變成一個仍在運作的宗教制度。</p><p>16:30準時下山。堂內禁止攝影、寫生和使用電筒，舞台周邊禁三腳架，也應避免妨礙信眾。離開時由坡地回望一次木構支撐，然後把參觀模式切回交通：預留35分鐘步行往近鐵奈良站，不再加景點。</p></section>
            <div class="deep-takeaway"><strong>到場任務</strong><span>先看舞台與樓梯的儀式動線，再看景；用聲音和不可見本尊理解延續。</span></div>
            <p class="deep-sources"><a href="https://www.todaiji.or.jp/information/nigatsudo/" target="_blank" rel="noopener">東大寺：二月堂建築與參拜限制 ↗</a> · <a href="https://www.todaiji.or.jp/annual/event/shunie/" target="_blank" rel="noopener">東大寺：修二會完整說明 ↗</a> · <a href="https://www.todaiji.or.jp/mesuem-240209/" target="_blank" rel="noopener">東大寺：修二會法會空間展覽說明 ↗</a></p>
          </div>
        </article>

        <article class="deep-station synthesis" id="deep-synthesis" data-deep-station>
          <aside class="deep-station-aside">
            <span class="deep-station-number">06</span>
            <time>讀完後再出發</time>
            <h3>把五站串成一條線</h3>
            <p class="deep-question">主問題：每站改變了你對「原真」、「保存」與「活寺院」的哪一層理解？</p>
          </aside>
          <div class="deep-station-body">
            <section><h4>由保存的原物，走回原物曾經服務的系統</h4><p>ミュージアム先把脆弱寺寶移到穩定、免震和可近看的環境，讓材料、修補和造像差異清楚呈現。南大門把你帶回鎌倉復興現場：建築結構、仁王像和工房制度共同處理1180年後的重建。大佛殿再把工程尺度推到國家層面，巨佛、殿宇、燈籠與蓮華藏世界把政治動員和華嚴宇宙觀結合。</p><p>法華堂將問題變得更複雜：奈良正堂、鎌倉禮堂、不同材料群像和近代移座同處一堂，沒有單一時刻可以代表全部「原貌」。二月堂則把重點由物件轉到行法；即使建築焚毀、本尊不可見，儀式仍能靠群體、聲音、程序和誓約延續。五站共同說明，東大寺的真實性存在於材料、場所、修補、功能與記憶的重疊。</p></section>
            <section><h4>現場不需要再讀長文</h4><p>到場後只需每站回答一題：ミュージアム看材料差異；南大門看集體工程；大佛殿看尺度如何服務華嚴；法華堂看群像和兩時代接縫；二月堂看儀式如何塑造空間。答案未必要完整，重點是把注意力放回原物，而非站在標籤前重新閱讀本頁。</p><p>這個專頁可以取代大部分背景說明，無法取代泥塑的細微表面、乾漆的空心重量感、銅佛的尺度、殿堂暗光、木板回響和人群流動。預習的目的正是把有限現場時間留給這些只能親身獲得的證據。</p></section>
            <div class="deep-takeaway"><strong>一句總結</strong><span>東大寺不是保存於某一年份的完整古蹟；它是反覆失去、修補、移動、重建和繼續使用後仍能運作的宗教共同體。</span></div>
          </div>
        </article>
      </div>`;

    summaries.insertAdjacentElement('beforebegin', section);

    const articles = Array.from(section.querySelectorAll('[data-deep-station]'));
    const tooShort = articles.filter((article) => article.textContent.replace(/\s+/g, '').length < 520);
    if (articles.length !== 6 || tooShort.length) {
      console.error(`Tōdai-ji deep-reading audit failed: ${articles.length} chapters; short chapters: ${tooShort.map((item) => item.id).join(', ')}`);
    }
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
