const Footer = (root) => {
  const _classes = {
    base: {
      self: 'bg-stone-700 text-stone-100 h-10 sticky bottom-0 text-right pr-2',
    }
  }
  const _self = document.createElement('footer');
    _self.className = _classes.base.self;
    _self.innerText = 'Made by J.Clark';

  root.append(_self);
}
export default Footer;