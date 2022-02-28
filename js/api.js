export default function api() {
  // Pego a div pai para ser usada na criação de elementos (img x video)
  let input = $('.input').val()
  let data = document.querySelector('.input')
  const dataAtual = new Date().toISOString().slice(0, 10)
  data.max = dataAtual;
  data.min = "1995-06-16";

  // Executa a função quando carrega a tela
  $(document).ready(function() {
    pegaAPI();
})

  // Função para mudar a tela de acordo com a nova data
  const botao = $('.botaoPesquisar')
  botao.on('click', function(){
    let valorData = data.value
    input = valorData
    pegaAPI()
  })

   // Função para buscar os elementos
  function pegaAPI() {
    const xhr = $.ajax({
    method: "GET",
    url:`https://api.nasa.gov/planetary/apod?api_key=hSDYPWq10rdn2gUryUeuUbBqCla3FznDZDqRWuSn&date=${input}`,
    // Em caso de sucesso, vai executar a função
    success: function() {
    // Adicionando elementos à tela
    let titulo = $('.titulo-apod').text(xhr.responseJSON.title)
    let data = $('.data-apod').text(xhr.responseJSON.date)
    let explanation = $('.explanation-apod').text(xhr.responseJSON.explanation)
   
    // Pego o elemento img
      let img = $('img')

    //Pego o elemento de vídeo
      let video = $('iframe')
    
    // Pego a url
    let url = xhr.responseJSON.url

    // Se media-type for imagem, vou criar objeto de img
    if (xhr.responseJSON.media_type == 'image') {

      // Adiciono atributo src e defino url da imagem
      img.attr('src', url)

      // Modifico a classe para aparecer imagem e tirar o vídeo
      img.removeClass("desativada")
      video.addClass("desativada")

    } else {
      // Adiciono atributo src e defino url do video
      video.attr('src', url)

      // Modifico a classe para aparecer o vídeo e tirar a imagem
      video.removeClass("desativada")
      img.addClass("desativada")
    }
    },
  })
  }

}
