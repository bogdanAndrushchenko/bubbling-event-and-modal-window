/**
 * Всплиття івентів
 * Вихідний елемент event.target event.current.Target
 */

const refs = {
    parent: document.querySelector('#parent'),
    child: document.querySelector('#child'),
    innerChild: document.querySelector('#inner-child'),
};

const parentClickHandler = (event) => {
    console.log('parent');
    console.log('target :', event.target);
    console.log('currentTarget :', event.currentTarget);
};
const childClickHandler = (event) => {
    console.log('child');
    console.log('target :', event.target);
    console.log('currentTarget :', event.currentTarget);
};
const innerChildClickHandler = (event) => {
    console.log('inner -child');
    console.log('target :', event.target);
    console.log('currentTarget :', event.currentTarget);

    event.stopPropagation(); // метод для відміни подіїї яка є зареєстрована вище
};

refs.parent.addEventListener('click', parentClickHandler);
refs.child.addEventListener('click', childClickHandler);
refs.innerChild.addEventListener('click', innerChildClickHandler);

/// делегування подій
/**
 * делегування поягає в тому щоб скоротити код і не вішати прослушку
 *  на кожен елемент а на його батьківський 
 */

/**
 * в даному прикладі ми вішаємо подію не не кожна кнопку, а на батьківський елемент
 * і через event.target беремо ссилку на потрібний елемент
 */
const refsD = {
    tags: document.querySelector('.js-tags'),
    activeTagOutput: document.querySelector(".js-active-tag")
};

const onTagsClick = (event) => {


    //якщо повішали прослушку на батьківський елемент то стандартно робимо перевірку
    // чи клікнули на конкретний тег. в даному випадку на BUTTON
    // в event.target.nodeName назви тегів ідуть великими буквами
    if (event.target.nodeName !== 'BUTTON') {
        return
    }
    setActiveTag(event.target)
    // setActiveTagNow(event.target)
    /**щоб була тільки одна активна кнопка тоді мусимо вішати і знімати клас  */
    updateOutput(event.target.dataset.value)


}
// const setActiveTagNow = (element) => {
//     if (element) {
//         element.classList.toggle('tags__btn--active')
//     }

//     // nextTagBtn.classList.add('tags__btn--active');
// }


const setActiveTag = (nextTagBtn) => {
    const currentActiveTag = event.currentTarget.querySelector('.tags__btn--active');
    if (currentActiveTag) {
        currentActiveTag.classList.remove('tags__btn--active')
    }

    nextTagBtn.classList.add('tags__btn--active');
    console.log(nextTagBtn);
}


const updateOutput = (value) => {
    refsD.activeTagOutput.textContent = value;
}
refsD.tags.addEventListener('click', onTagsClick);


// const {target , currentTarget} = event

/**
 * lodesh
 */
/////////////          MODAL        //////////

const openModalBtn = document.querySelector('button[data-action="open-modal"]');
const closeModalBtn = document.querySelector('button[data-action="close-modal"]');
const backDropRef = document.querySelector('.js-backdrop');

const onOpenModal = () => {
    window.addEventListener('keydown', onPressEscape);
    document.body.classList.add('show-modal'); //выдкриваємо модалку
};

const closeModal = () => {
    window.removeEventListener('keydown', onPressEscape);
    document.body.classList.remove('show-modal'); // закриваємо модалку 
};

const closeOnBackDropClick = (event) => {
    if (event.target === event.currentTarget) { // закриваємо модалку
        closeModal();
    };
};

const onPressEscape = (event) => {
    if (event.code === 'Escape') {
        closeModal();
    };
};

openModalBtn.addEventListener('click', onOpenModal); //выдкриваємо модалку

closeModalBtn.addEventListener('click', closeModal); // закриваємо модалку через кнопку close

backDropRef.addEventListener('click', closeOnBackDropClick);
// закриваємо модалку через клік в сірій зоні, порівнюємо через всплиття